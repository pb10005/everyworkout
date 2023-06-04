'use client';

import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <main id="lp" className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Image width={500} height={500} src="/assets/Weights-rafiki.svg" alt="Weights"></Image>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Every <span className="text-cyan-700">W</span>orkout
          </h1>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
          <a href="https://storyset.com/people">People illustrations by Storyset</a>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center">
        {sessionData && (
          <Link
            href="/dashboard"
            className="rounded-full px-10 py-3 font-semibold no-underline shadow"
          >
            Dashboard
          </Link>
        )}
      </p>
      <button
        className="rounded-full px-10 py-3 font-semibold no-underline shadow"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
