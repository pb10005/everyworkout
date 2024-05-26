'use client';

import { type NextPage } from "next";

import { BackButton, RMCalcualtor } from "../../components";
import { Container, Heading, Navigation } from "../../components/server";

const RMCalculator: NextPage = () => {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <BackButton>戻る</BackButton>
          <RMCalcualtor />
        </Container>
      </main>
    </>
  );
};

export default RMCalculator;
