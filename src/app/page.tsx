'use client';

import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthShowcase } from "../components";

const Home: NextPage = () => {
  return (
    <>
        <main id="lp" className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
          <div className="container flex flex-col items-center justify-center">
            <Image src="/logo_v.png" alt="logo" width={500} height={100} />
            <div className="flex flex-col items-center gap-2">
              <AuthShowcase />
              <Link className="dark:text-white" href="https://everyworkout-docs.netlify.app/" target="_blank">ユーザーズガイド</Link>
            </div>
          </div>
        </main>
    </>
  );
};

export default Home;

