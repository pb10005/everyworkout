import * as React from "react";

type Props = {
  exercise: string;
  weight: number;
};

export const RecordCard: React.FC<Props> = (props: Props) => {
  const { exercise, weight } = props;

  return (
    <>
      <div className="mb-2 rounded-lg p-2 shadow-lg">
        <p className="font-bold">{exercise}</p>
        <p>{weight}kg</p>
      </div>
    </>
  );
};
