import * as React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const Button: React.FC<Props> = (props: Props) => {
  const { children, onClick } = props;

  return (
    <>
      <button
        className="bg-blue-200 hover:bg-white px-4 py-2 rounded"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
