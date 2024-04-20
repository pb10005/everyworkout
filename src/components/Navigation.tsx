import * as React from "react";
import Link from "next/link";
import { HomeIcon, MagnifyingGlassIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/20/solid";

export const Navigation: React.FC = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-1">
            <Link className="flex flex-col w-20 py-1 items-center text-[#42bfec] hover:bg-[#42bfec] hover:text-cyan-100" href="/dashboard">
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs font-medium">Dashboard</span>
            </Link>
            <Link className="flex flex-col w-20 py-1 items-center text-[#42bfec] hover:bg-[#42bfec] hover:text-cyan-100" href="/search">
              <MagnifyingGlassIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Search</span>
            </Link>
            <Link className="flex flex-col w-20 py-1 items-center text-[#42bfec] hover:bg-[#42bfec] hover:text-cyan-100" href="/workout/recorder">
              <PencilSquareIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Record</span>
            </Link>
            <Link className="flex flex-col w-20 py-1 items-center text-[#42bfec] hover:bg-[#42bfec] hover:text-cyan-100" href="/profile">
              <UserIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
