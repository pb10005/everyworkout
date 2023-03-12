import * as React from "react";

type Props = {
  label: string;
  onClick: () => void;
};

export const Badge: React.FC<Props> = (props: Props) => {
  const { label, onClick } = props;

  return (
    <>
      <span className="mr-2 rounded bg-gray-200 p-2" onClick={onClick}>
        {label}
      </span>
    </>
  );
};
