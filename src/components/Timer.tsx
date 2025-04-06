"use client";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { ArrowPathIcon, PlayIcon, PauseIcon } from "@heroicons/react/20/solid";
import { useNotification } from "../hooks/useNotification";

type Props = {
    expiryTimeDelta: number;
    onExpire?: () => void;
};

export const Timer: React.FC<Props> = (props: Props) => {
    const { expiryTimeDelta, onExpire } = props;

    const [isExpired, setExpired] = useState<boolean>(false);
    const tmp = new Date().getSeconds() + expiryTimeDelta;
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(tmp);

    const { requestPermission, notify } = useNotification();
    const {
        seconds,
        minutes,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp: expiryTimestamp,
        autoStart: false,
        onExpire: () => { 
            notify("インターバル終了！");
            setExpired(true); 
            resetInterval(new Date(), expiryTimeDelta); 
            if (onExpire) onExpire(); 
        }
    });

    const zeroPadding = (val: number) => {
        return (`00${val}`).slice(-2);
    };

    const resumeTimer = async () => {
        await requestPermission();
        setExpired(false);
        resume();
    };

    const resetInterval = (now: Date, expiryTimeDelta: number) => {
        now.setSeconds(now.getSeconds() + expiryTimeDelta);
        restart(now, false);
    };

    useEffect(() => {
        const now = new Date();
        resetInterval(now, expiryTimeDelta);
    }, [expiryTimeDelta]);

    return (
        <>
            <div className="flex flex-col divide-y bg-white dark:bg-gray-900 dark:divide-gray-500 dark:text-white rounded-lg shadow-xl dark:shadow-none dark:outline outline-1 outline-gray-500 mx-2 md:mx-0">
                <div className="text-6xl font-extrabold p-4 text-center">
                    <span>{zeroPadding(minutes)}</span>:<span>{zeroPadding(seconds)}</span>
                </div>
                <div className="flex justify-between items-center divide-x dark:divide-gray-500">
                    <button className="w-full flex justify-center" onClick={() => void resumeTimer()}>
                        <span>
                            <PlayIcon className="w-10 h-10 cursor-pointer">再開</PlayIcon>
                        </span>
                    </button>
                    <button className="w-full flex justify-center" onClick={pause}>
                        <span>
                            <PauseIcon className="w-10 h-10 cursor-pointer">一時停止</PauseIcon>
                        </span>
                    </button>
                    <button className="w-full flex justify-center" onClick={() => resetInterval(new Date(), expiryTimeDelta)}>
                        <span>
                            <ArrowPathIcon className="w-10 h-10 cursor-pointer">開始</ArrowPathIcon>
                        </span>
                    </button>
                </div>
                {isExpired && <p className="text-4xl text-center">インターバル終了！</p>}
            </div>
        </>
    );
};

