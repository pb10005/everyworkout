"use client";

import { type NextPage } from "next";

import { Heading, Navigation } from "../../src/components";
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { RMCalcualtor } from "../../src/components";

const RMCalculator: NextPage = () => {

  const router = useRouter();

  return (
    <>
      <main className="bg-gray-100">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4">
            <section className="mb-2 p-2">
              <ChevronLeftIcon className="w-8 h-8 cursor-pointer" onClick={() => router.back()}></ChevronLeftIcon>
              <RMCalcualtor />
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default RMCalculator;
