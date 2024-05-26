import * as React from "react";
import Link from "next/link";
import { HomeIcon, ListBulletIcon, MagnifyingGlassIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/20/solid";

type Props = {
  currentPage?: string;
};

export const Navigation: React.FC<Props> = (props: Props) => {
  const { currentPage } = props;
  const generateClassName = (targetPage: string) => {
    return `flex flex-col w-20 py-1 items-center text-[#42bfec] hover:bg-[#42bfec] hover:text-cyan-100 ${currentPage === targetPage ? 'bg-[#42bfec] text-white' : ''}`;
  };

  type Page = {
    key: string;
    path: string;
    icon: React.ReactNode;
    label: string;
  };
  const pages: Page[] = [
    { key: 'dashboard', path: '/dashboard', icon: <><HomeIcon className="w-6 h-6" /></>, label: 'Dashboard' },
    { key: 'search', path: '/search', icon:<><MagnifyingGlassIcon className="w-6 h-6" /></> , label: 'Search'},
    { key: 'workout-menu', path: '/workout-menu', icon:<><ListBulletIcon className="w-6 h-6" /></> , label: 'Workout'},
    { key: 'workout-recorder', path: '/workout/recorder', icon:<><PencilSquareIcon className="w-6 h-6" /></> , label: 'Record'},
    { key: 'profile', path: '/profile', icon:<><UserIcon className="w-6 h-6" /></> , label: 'Profile'},
  ];

  return (
    <>
      <div className="z-30 fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center dark:divide-x divide-gray-500">
            {pages.map(p => {
              return (<>
                <Link className={generateClassName(p.key)} href={p.path}>
                  {p.icon}
                  <span className="text-xs font-medium">{p.label}</span>
                </Link>
              </>)
            })}
          </div>
        </div>
      </div>
    </>
  );
};
