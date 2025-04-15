import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export const Heading: React.FC = () => {
    return (
        <header className="z-30 fixed top-0 bg-white dark:bg-gray-900 flex justify-center items-center w-full 
            dark:border-b dark:border-gray-700 shadow-sm dark:shadow-none
            py-2 transition-all duration-200 ease-in-out">
            <Link href="/" className="hover:opacity-90 transition-opacity duration-200" aria-label="Go to homepage">
                <Image 
                    src="/logo_h.png" 
                    alt="EveryWorkout Logo" 
                    width={166} 
                    height={50}
                    className="h-10 w-auto"
                    priority
                />
            </Link>
        </header>
    );
};
