import * as React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "reset" | "submit" | undefined;
  layout?: string;
  onClick: () => void;
};

export const Button: React.FC<Props> = (props: Props) => {
  const { className, type, layout, children, onClick } = props;

  const styleType = layout || "normal";
  const style: { [key: string]: string } = {
    "normal": "rounded-lg outline outline-1 outline-[#42bfec] text-[#42bfec] hover:bg-[#42bfec] hover:text-white tracking-wide",
    "danger": "rounded-lg outline outline-1 outline-red-600 text-red-600 hover:bg-red-600 hover:text-white tracking-wide"
  }
  return (
    <>
      <button
        type={type}
        className={`${style[styleType] || ""} px-4 py-2 ${className || ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
