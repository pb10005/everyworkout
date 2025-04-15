import * as React from "react";
import Link from "next/link";
import { HomeIcon, ListBulletIcon, MagnifyingGlassIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/20/solid";

type Props = {
  currentPage?: string;
};

export const Navigation: React.FC<Props> = (props: Props) => {
  const { currentPage } = props;
  
  const generateClassName = (targetPage: string) => {
    const isActive = currentPage === targetPage;
    return `flex flex-col w-20 py-2 items-center justify-center 
      text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20
      ${isActive ? 'bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600' : ''}
      transition-all duration-200 ease-in-out transform 
      ${isActive ? 'scale-105' : 'hover:scale-105 active:scale-95'}`;
  };

  type Page = {
    key: string;
    path: string;
    icon: React.ReactNode;
    label: string;
    ariaLabel: string;
  };
  
  const pages: Page[] = [
    { 
      key: 'dashboard', 
      path: '/dashboard', 
      icon: <HomeIcon className="w-6 h-6" />, 
      label: 'Dashboard',
      ariaLabel: 'Go to Dashboard' 
    },
    { 
      key: 'search', 
      path: '/search', 
      icon: <MagnifyingGlassIcon className="w-6 h-6" />, 
      label: 'Search',
      ariaLabel: 'Search exercises' 
    },
    { 
      key: 'workout-menu', 
      path: '/workout-menu', 
      icon: <ListBulletIcon className="w-6 h-6" />, 
      label: 'Workout',
      ariaLabel: 'View workout menu' 
    },
    { 
      key: 'workout-recorder', 
      path: '/workout/recorder', 
      icon: <PencilSquareIcon className="w-6 h-6" />, 
      label: 'Record',
      ariaLabel: 'Record workout' 
    },
    { 
      key: 'profile', 
      path: '/profile', 
      icon: <UserIcon className="w-6 h-6" />, 
      label: 'Profile',
      ariaLabel: 'View profile' 
    },
  ];

  return (
    <nav className="z-30 fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 
      shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-none
      dark:border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-stretch">
          {pages.map(p => (
            <Link 
              className={generateClassName(p.key)} 
              href={p.path} 
              key={p.key}
              aria-label={p.ariaLabel}
              aria-current={currentPage === p.key ? 'page' : undefined}
            >
              <div className={`${currentPage === p.key ? 'animate-pulse' : ''}`}>
                {p.icon}
              </div>
              <span className="text-xs font-medium mt-1">{p.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
