"use client";

import { useEffect, useState } from "react";
import { Timer, Button, BackButton } from "../../components";
import { Container, Heading, Navigation } from "../../components/server";

const TIMER_KEY = 'everyworkout_timer_state';

type SavedTimer =
  | { state: 'running'; expiryAt: number; duration: number }
  | { state: 'paused'; remainingSeconds: number; duration: number };

export const TimerPageClient: React.FC = () => {
  const [expiryTD, setExpiryTD] = useState<number>(120);
  const [isStarted, setStarted] = useState<boolean>(false);
  const [autoStart, setAutoStart] = useState<boolean>(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(TIMER_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as SavedTimer;
      if (saved.state === 'running') {
        const remaining = Math.floor((saved.expiryAt - Date.now()) / 1000);
        if (remaining > 0) {
          setExpiryTD(remaining);
          setAutoStart(true);
          setStarted(true);
        } else {
          sessionStorage.removeItem(TIMER_KEY);
        }
      } else {
        setExpiryTD(saved.remainingSeconds);
        setAutoStart(false);
        setStarted(true);
      }
    } catch {
      sessionStorage.removeItem(TIMER_KEY);
    }
  }, []);

  const modifyExpiryTD = (delta: number) => {
    const newVal = Math.max(0, expiryTD + delta);
    setExpiryTD(newVal);
  };

  const handleStart = () => {
    const expiryAt = Date.now() + expiryTD * 1000;
    sessionStorage.setItem(TIMER_KEY, JSON.stringify({
      state: 'running', expiryAt, duration: expiryTD,
    } satisfies SavedTimer));
    setAutoStart(false);
    setStarted(true);
  };

  const handleExpire = () => {
    sessionStorage.removeItem(TIMER_KEY);
  };

  const handlePause = (remainingSeconds: number) => {
    sessionStorage.setItem(TIMER_KEY, JSON.stringify({
      state: 'paused', remainingSeconds, duration: expiryTD,
    } satisfies SavedTimer));
  };

  const handleReset = () => {
    sessionStorage.removeItem(TIMER_KEY);
  };

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <div className="flex flex-col gap-2 p-2">
            <BackButton>戻る</BackButton>
            {
              !isStarted &&
              <>
                <div className="bg-white divide-y rounded-lg shadow-xl dark:outline outline-1 outline-gray-500 dark:divide-gray-500 dark:bg-gray-900 dark:text-white">
                  <p className="p-4 text-4xl font-extrabold text-center"><span>{expiryTD}</span><span>sec</span></p>
                  <div className="flex gap-1 justify-between items-center divide-x">
                    <button className="text-center w-full py-2" onClick={() => void modifyExpiryTD(-60)}>-1min</button>
                    <button className="text-center w-full py-2" onClick={() => void modifyExpiryTD(-10)}>-10sec</button>
                    <button className="text-center w-full py-2" onClick={() => void modifyExpiryTD(10)}>+10sec</button>
                    <button className="text-center w-full py-2" onClick={() => void modifyExpiryTD(60)}>+1min</button>
                  </div>
                </div>
                <div className="flex justify-center items-center text-xl mt-1">
                  <Button onClick={handleStart}>開始</Button>
                </div>
              </>
            }
            {
              isStarted &&
              <Timer
                expiryTimeDelta={expiryTD}
                autoStart={autoStart}
                onExpire={handleExpire}
                onPause={handlePause}
                onReset={handleReset}
              />
            }
          </div>
        </Container>
      </main>
    </>
  );
};
