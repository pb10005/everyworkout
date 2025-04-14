'use client';

import { type NextPage } from "next";

import { BackButton, RMCalculator } from "../../components";
import { Container, Heading, Navigation } from "../../components/server";

const RMCalculatorPage: NextPage = () => {
  return (
    <>
      <main className="md:mt-4 min-h-screen bg-gray-50 dark:bg-gray-900">
        <Heading />
        <Navigation />
        <Container>
          <div className="mb-4">
            <BackButton>戻る</BackButton>
          </div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">RM計算機</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              重量と回数から1RMを計算します。種目によって計算式が異なります。
            </p>
          </div>
          <RMCalculator />
        </Container>
      </main>
    </>
  );
};

export default RMCalculatorPage;
