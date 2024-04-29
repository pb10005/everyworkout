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
        className="px-3 py-2 inline-block rounded-full cursor-pointer bg-gray-200 dark:bg-gray-700 dark:text-white"
        onClick={onClick}
      >
        {label}
      </span>
    </>
  );
};
