import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export const Heading: React.FC = () => {
    return (
        <>
            <div className="fixed top-0 bg-white dark:bg-gray-900 flex justify-center items-center w-full dark:outline outline-1 outline-gray-500">
                <Link href="/">
                    <Image src="/logo_h.png" alt="logo" width={166} height={50}/>
                </Link>
            </div>
        </>
    );
};
