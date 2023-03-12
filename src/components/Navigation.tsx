import * as React from "react";
import Link from "next/link";

export const Navigation: React.FC = () => {
  return (
    <>
      <div className="py-4">
        <span className="px-2">
          <Link href="/">Home</Link>
        </span>
        <span className="px-2">
          <Link href="/dashboard">Dashboard</Link>
        </span>
        <span className="px-2">
          <Link href="/workout/add">Add Workout</Link>
        </span>
      </div>
    </>
  );
};
