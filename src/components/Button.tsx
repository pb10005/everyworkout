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
    "normal": "bg-cyan-600 outline outline-2 outline-cyan-300 text-cyan-50 tracking-wide",
    "danger": "bg-red-600 outline outline-2 outline-orange-300 text-white tracking-wide"
  }
  return (
    <>
      <button
        type={type}
        className={`${style[styleType] || ""} px-6 py-2 rounded-full ${className || ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
