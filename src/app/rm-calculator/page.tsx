"use client";

import { type NextPage } from "next";

import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { RMCalcualtor } from "../../components";
import { Container, Heading, Navigation } from "../../components/server";

const RMCalculator: NextPage = () => {

  const router = useRouter();

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <section className="p-2">
            <ChevronLeftIcon className="w-8 h-8 cursor-pointer dark:text-white" onClick={() => router.back()}></ChevronLeftIcon>
            <RMCalcualtor />
          </section>
        </Container>
      </main>
    </>
  );
};

export default RMCalculator;
