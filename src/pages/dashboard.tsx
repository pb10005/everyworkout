import { type NextPage } from "next";
import Link from "next/link";

import { RecordCard } from "../components/RecordCard";

const records = [
  { exercise: "ベンチプレス", weight: 62.5 },
  { exercise: "スクワット", weight: 70 },
];
const Dashboard: NextPage = () => {
  return (
    <>
      {records.map(({ exercise, weight }) => {
        return <RecordCard exercise={exercise} weight={weight} />;
      })}
    </>
  );
};

export default Dashboard;
