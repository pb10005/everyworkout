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
    "normal": "bg-cyan-600 text-cyan-50 tracking-widest",
    "danger": "bg-red-600 text-white tracking-widest"
  }
  return (
    <>
      <button
        type={type}
        className={`${style[styleType] || ""} px-6 py-2 ${className || ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
