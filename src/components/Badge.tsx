import * as React from "react";

type Props = {
  label: string;
  onClick?: () => void;
};

export const Badge: React.FC<Props> = (props: Props) => {
  const { label, onClick } = props;

  return (
    <>
      <span
        className="mb-1 p-2 inline-block rounded cursor-pointer bg-gray-200 dark:bg-gray-700 dark:text-white"
        onClick={onClick}
      >
        {label}
      </span>
    </>
  );
};
