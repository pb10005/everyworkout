import * as React from "react";

type Props = {
  children: React.ReactNode;
  type?: string;
  onClick: () => void;
};

export const Button: React.FC<Props> = (props: Props) => {
  const { type, children, onClick } = props;

  const styleType = type || "normal";
  const style: { [key: string]: string } = {
    "normal": "bg-blue-200 hover:bg-white",
    "danger": "bg-red-200 hover:bg-white"
  }
  return (
    <>
      <button
        className={`${style[styleType] || ""} px-4 py-2 rounded mr-2`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
