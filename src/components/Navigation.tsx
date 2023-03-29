import * as React from "react";
import Link from "next/link";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const Navigation: React.FC = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <span className="flex justify-center">
            <Link className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex justify-center items-center" href="/dashboard"><HomeIcon className="text-white w-8 h-8"/></Link>
            <Link className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex justify-center items-center" href="/search"><MagnifyingGlassIcon className="text-white w-8 h-8"/></Link>
          </span>
        </div>
      </div>
    </>
  );
};
