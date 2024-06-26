"use client";

import { type NextPage } from "next";
import { useState } from "react";

import { Timer, Button, BackButton } from "../../components";
import { Container, Heading, Navigation } from "../../components/server";
import { useRouter } from 'next/navigation'

const TimerPage: NextPage = () => {
  const [expiryTD, setExpiryTD] = useState<number>(120);
  const [isStarted, setStarted] = useState<boolean>(false);

  const modifyExpiryTD = (delta: number) => {
    const newVal = Math.max(0, expiryTD + delta);
    setExpiryTD(newVal);
  }

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
                  <Button onClick={() => void setStarted(true)}>開始</Button>
                </div>
              </>
            }
            {
              isStarted && <>
                <Timer expiryTimeDelta={expiryTD}></Timer>
              </>
            }
          </div>
        </Container>
      </main>
    </>
  );
};

export default TimerPage;
