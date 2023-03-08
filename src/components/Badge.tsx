import * as React from "react";

type Props = {
  label: string;
};

export const Badge: React.FC<Props> = (props: Props) => {
  const { label } = props;

  return (
    <>
      <span className="mr-2 rounded bg-gray-200 p-2">{label}</span>
    </>
  );
};
