import * as React from "react";
import Link from "next/link";

export const Heading: React.FC = () => {
    return (
        <>
            <div className="fixed top-0 py-2 bg-cyan-700 flex justify-center items-center w-full">
                <Link href="/">
                    <span className="text-xl text-white font-bold">EveryWorkout</span>
                </Link>
            </div>
        </>
    );
};
