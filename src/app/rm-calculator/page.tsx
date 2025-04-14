'use client';

import { type NextPage } from "next";

import { BackButton, RMCalculator } from "../../components";
import { Container, Heading, Navigation } from "../../components/server";

const RMCalculatorPage: NextPage = () => {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <BackButton>戻る</BackButton>
          <RMCalculator />
        </Container>
      </main>
    </>
  );
};

export default RMCalculatorPage;
