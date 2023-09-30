'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useCompletion } from 'ai/react';
import { useEffect, useState } from 'react';
import { Button, Heading, Navigation } from '../../src/components';
import { api } from '../../src/utils/api';

export default function Completion() {

    const [date, setDate] = useState<string>(
        new Date().toISOString().split("T")[0] || ""
    );
    const { data, isLoading: isWLoading, isSuccess } =
        api.workout.getUserWorkouts.useQuery({
            date: new Date(date).toISOString(),
        });
    const { data: volume } = api.workout.getUserWorkoutVolume.useQuery({
        date: new Date(date).toISOString(),
    });

    const totalVolume = volume && (volume?.length > 0) ? volume[0]?.totalVolume : 0;

    const helper = useCompletion({
        api: '/api/completion',
    });
    const {
        completion,
        input,
        stop,
        isLoading,
        handleInputChange,
        handleSubmit,
    } = helper;

    useEffect(() => {
        const initialInput =
`1日のワークアウトの合計ボリュームは${totalVolume}kgでした。
行った種目の内訳は以下の通りです。
${data?.map(d => {
    return `- ${d.exercise.name}を${d.weight}kgで${d.reps}回×${d.sets}セット ${d.note ? "コメント: " + d.note : ""}`
}).join("\n") ?? "- トレーニング記録なし"}`;

        helper.setInput(initialInput);
    }, [totalVolume]);

    const decrementDate = () => {
        const tmp = new Date(date);
        tmp.setDate(tmp.getDate() - 1);
        const dateString = tmp.toISOString().split("T")[0] || "";
        setDate(dateString);
    };

    const incrementDate = () => {
        const tmp = new Date(date);
        tmp.setDate(tmp.getDate() + 1);
        const dateString = tmp.toISOString().split("T")[0] || "";
        setDate(dateString);
    };


    return (
        <>
            <main className="bg-gray-100">
                <Heading />
                <Navigation />
                <div className="mx-auto w-full max-w-md flex flex-col stretch my-2 gap-2">
                    <div className='text-2xl font-bold'>AIトレーナー</div>
                    <div className="mb-2">
                        <label
                            className="mb-2 block text-sm font-bold text-gray-700"
                            htmlFor="date"
                        >
                            日付を選択
                        </label>
                        <div className="flex justify-between items-center">
                            <span onClick={() => decrementDate()} className="cursor-pointer"><ChevronLeftIcon className="inline w-8 h-8"></ChevronLeftIcon>前日</span>
                            <span onClick={() => incrementDate()} className="cursor-pointer">翌日<ChevronRightIcon className="inline w-8 h-8"></ChevronRightIcon></span>
                        </div>
                        <input
                            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                            id="date"
                            type="date"
                            placeholder="日付"
                            value={date}
                            onChange={(e) => { e.target.value && setDate(e.target.value) }}
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            トレーニングメモを記入してください。
                            <textarea
                                className="w-full max-w-md border border-gray-300 rounded shadow-xl p-2"
                                value={input}
                                onChange={handleInputChange}
                            />
                        </label>
                        <div className='flex gap-2'>
                            <Button type="button" onClick={stop}>
                                Stop
                            </Button>
                            {!isLoading && <Button type="submit">
                                Send
                            </Button>}
                        </div>
                    </form>
                    <label className='text-gray-500 text-sm'>AIのコメント</label>
                    <div className='bg-white rounded-lg shadow-xl p-4 whitespace-pre-wrap'>{completion}</div>
                </div>
            </main>
        </>
    );
}
