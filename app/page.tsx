'use client';

import { type NextPage } from "next";
import Image from "next/image";
import { AuthShowcase } from "../src/components";

const Home: NextPage = () => {
  return (
    <>
        <main id="lp" className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
          <div className="container flex flex-col items-center justify-center">
            <Image src="/logo_v.png" alt="logo" width={500} height={100} />
            <div className="flex flex-col items-center gap-2">
              <AuthShowcase />
            </div>
          </div>
        </main>
    </>
  );
};

export default Home;

