"use client";

import { type NextPage } from "next";
import { api } from "../../src/utils/api";

import { Heading, Navigation } from "../../src/components";
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { RMCalcualtor } from "../../src/components";

const RMCalculator: NextPage = () => {

  const router = useRouter();

  return (
    <>
      <main className="h-screen bg-gray-50">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4">
            <section className="mb-2 p-2">
                <ChevronLeftIcon className="w-6 h-6 cursor-pointer" onClick={() => router.back()}></ChevronLeftIcon>
                <RMCalcualtor />
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default RMCalculator;
