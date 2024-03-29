"use client";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
import { Button } from ".";
import { ArrowPathIcon, PlayIcon, PauseIcon } from "@heroicons/react/20/solid";

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

    const {
        seconds,
        minutes,
        isRunning,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp: expiryTimestamp,
        autoStart: false,
        onExpire: () => { setExpired(true); resetInterval(); if (onExpire) onExpire(); }
    });

    const zeroPadding = (val: number) => {
        return (`00${val}`).slice(-2);
    };

    const resumeTimer = () => {
        setExpired(false);
        resume();
    };

    const resetInterval = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + expiryTimeDelta);
        restart(time, false);
    };

    return (
        <>
            <div className="flex flex-col divide-y bg-white rounded-lg shadow-xl">
                <div className="text-6xl font-extrabold p-4 text-center">
                    <span>{zeroPadding(minutes)}</span>:<span>{zeroPadding(seconds)}</span>
                </div>
                <div className="flex justify-between items-center divide-x">
                    <button className="w-full flex justify-center" onClick={resumeTimer}>
                        <span>
                            <PlayIcon className="w-10 h-10 cursor-pointer">再開</PlayIcon>
                        </span>
                    </button>
                    <button className="w-full flex justify-center" onClick={pause}>
                        <span>
                            <PauseIcon className="w-10 h-10 cursor-pointer">一時停止</PauseIcon>
                        </span>
                    </button>
                    <button className="w-full flex justify-center" onClick={resetInterval}>
                        <span>
                            <ArrowPathIcon className="w-10 h-10 cursor-pointer">開始</ArrowPathIcon>
                        </span>
                    </button>
                </div>
                {isExpired && <p className="text-4xl">インターバル終了！</p>}
            </div>
        </>
    );
};

