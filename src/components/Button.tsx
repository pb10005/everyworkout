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
    "normal": "bg-blue-200 hover:bg-white",
    "danger": "bg-red-200 hover:bg-white"
  }
  return (
    <>
      <button
        type={type}
        className={`${style[styleType] || ""} px-4 py-2 rounded-full mr-2 ${className || ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
