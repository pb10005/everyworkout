import * as React from "react";
import Link from "next/link";

export const Navigation: React.FC = () => {
  return (
    <>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/workout/add">Add Workout</Link>
    </>
  );
};
