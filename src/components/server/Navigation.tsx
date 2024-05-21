import * as React from "react";
import Link from "next/link";
import { HomeIcon, ListBulletIcon, MagnifyingGlassIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/20/solid";

type Props = {
  currentPage?:string;
};

export const Navigation: React.FC<Props> = (props: Props) => {
  const { currentPage } = props;
  const generateClassName = (targetPage: string) => {
    return `flex flex-col w-20 py-1 items-center text-[#42bfec] hover:bg-[#42bfec] hover:text-cyan-100 ${currentPage === targetPage ? 'bg-[#42bfec] text-white' : ''}`;
  };

  return (
    <>
      <div className="z-30 fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center dark:divide-x divide-gray-500">
            <Link className={generateClassName('dashboard')} href="/dashboard">
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs font-medium">Dashboard</span>
            </Link>
            <Link className={generateClassName('search')} href="/search">
              <MagnifyingGlassIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Search</span>
            </Link>
            <Link className={generateClassName('workout-menu')} href="/workout-menu">
              <ListBulletIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Workout</span>
            </Link>
            <Link className={generateClassName('workout-recorder')} href="/workout/recorder">
              <PencilSquareIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Record</span>
            </Link>
            <Link className={generateClassName('profile')} href="/profile">
              <UserIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
