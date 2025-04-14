"use client";
import React, { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { useTimer } from "react-timer-hook";
import { ArrowPathIcon, PlayIcon, PauseIcon } from "@heroicons/react/20/solid";
import { useNotification } from "../hooks/useNotification";

export interface TimerProps {
  expiryTimeDelta: number;
  onExpire?: () => void;
  variant?: "standard" | "compact" | "countdown";
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({
  expiryTimeDelta,
  onExpire,
  variant = "standard",
  className
}) => {
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

  // Base styles for all timer variants
  const baseStyle = "flex flex-col overflow-hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl shadow-md dark:border dark:border-gray-700";
  
  // Variant-specific styles
  const variantStyles: { [key: string]: string } = {
    "standard": "mx-2 md:mx-0",
    "compact": "max-w-xs mx-auto",
    "countdown": "mx-2 md:mx-0"
  };
  
  // Time display styles based on variant
  const getTimeDisplayStyle = () => {
    if (variant === "compact") {
      return "text-4xl md:text-5xl font-bold p-4 text-center font-mono";
    }
    return "text-5xl md:text-6xl font-bold p-6 text-center font-mono";
  };
  
  // Control area styles
  const controlAreaStyle = "flex justify-between items-center bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600";
  
  // Control button styles
  const controlButtonStyle = "w-full flex justify-center items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150";
  
  // Icon styles
  const iconStyle = "w-10 h-10 text-blue-500 dark:text-blue-400";

  // Combine all classes
  const timerClasses = [
    baseStyle,
    variantStyles[variant || 'standard'],
    className || ''
  ].filter(Boolean).join(" ");

  return (
    <div className={timerClasses}>
      <div className={getTimeDisplayStyle()}>
        <span>{zeroPadding(minutes)}</span>:<span>{zeroPadding(seconds)}</span>
      </div>
      <div className={controlAreaStyle}>
        <button 
          className={controlButtonStyle} 
          onClick={() => void resumeTimer()}
          aria-label="再開"
        >
          <PlayIcon className={iconStyle} />
        </button>
        <button 
          className={controlButtonStyle} 
          onClick={pause}
          aria-label="一時停止"
        >
          <PauseIcon className={iconStyle} />
        </button>
        <button 
          className={controlButtonStyle} 
          onClick={() => resetInterval(new Date(), expiryTimeDelta)}
          aria-label="リセット"
        >
          <ArrowPathIcon className={iconStyle} />
        </button>
      </div>
      {isExpired && (
        <div className="p-4 text-center bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium">
          インターバル終了！
        </div>
      )}
    </div>
  );
};
