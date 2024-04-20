import * as React from "react";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  href: string;
};

export const FloatingButton: React.FC<Props> = (props: Props) => {
  const { children, href } = props;

  const style: { [key: string]: string } = {
    "normal": "bg-[#42bfec] hover:bg-white",
    "danger": "bg-red-200 hover:bg-white"
  }
  return (
    <>
      <Link
        className="fixed z-90 right-3 bottom-12 w-16 h-16 rounded-full bg-[#42bfec] drop-shadow-lg flex justify-center items-center"
        href={href}
      >
        {children}
      </Link>
    </>
  );
};
