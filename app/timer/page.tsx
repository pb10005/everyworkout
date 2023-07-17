"use client";

import { type NextPage } from "next";
import { useState } from "react";

import { Heading, Navigation, Timer, Button } from "../../src/components";
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

const TimerPage: NextPage = () => {
  const [expiryTD, setExpiryTD] = useState<number>(120);
  const [isStarted, setStarted] = useState<boolean>(false);
  const router = useRouter();

  const modifyExpiryTD = (delta: number) => {
    const newVal = Math.max(0, expiryTD + delta);
    setExpiryTD(newVal);
  }

  return (
    <>
      <main className="h-screen bg-gray-100">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4">
            <section className="mb-2 p-2">
              <ChevronLeftIcon className="w-6 h-6 cursor-pointer" onClick={() => router.back()}></ChevronLeftIcon>
              {
                !isStarted &&
                <>
                  <div className="flex gap-1 justify-center items-center my-1">
                    <Button onClick={() => void modifyExpiryTD(60)}>+1min</Button>
                    <Button onClick={() => void modifyExpiryTD(10)}>+10sec</Button>
                    <p className="mr-2 text-xl font-bold">{expiryTD}</p>
                    <Button onClick={() => void modifyExpiryTD(-10)}>-10sec</Button>
                    <Button onClick={() => void modifyExpiryTD(-60)}>-1min</Button>
                  </div>
                  <div className="flex justify-center items-center text-xl">
                    <Button className="w-full" onClick={() => void setStarted(true)}>開始</Button>
                  </div>
                </>}
              {
                isStarted && <>
                  <Timer expiryTimeDelta={expiryTD}></Timer>
                </>
              }
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default TimerPage;
