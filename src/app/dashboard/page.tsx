
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { prisma } from "../../server/db";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { Credit, Loading } from "../../components";
import { Heading, Navigation, Container } from "../../components/server";
import { DashboardPage } from "./DashboardPage";
import type { DailyVolumeProp } from "../../components/types";
import { Suspense } from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  function* cumulativeDaily(data: DailyVolumeProp[]) {
    let cumulative = 0;
    for (const v of data) {
      cumulative += v.totalVolume || 0;
      yield { date: v.date.getTime(), cumulativeVolume: cumulative };
    }
  }

  const fetchCumulativeChartData = async () => {
    const data = await prisma.$queryRaw<{ max: string }[]>`select max("executeDate") from "WeeklyReportMaster";`;
    const dateQuery = new Date(data[0]?.max || '1975-01-01');

    const daily = await prisma.$queryRaw<DailyVolumeProp[]>`select date, sum("weight" * "reps" * "sets") "totalVolume" from "Workout" where "userId"=${session.user?.id} and date >= ${new Date(dateQuery)} and weight > 0 group by date order by date;`

    return Array.from(cumulativeDaily(daily));
  }

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation currentPage="dashboard" />
        <Suspense fallback={<Loading />}>
          <Container>
            <DashboardPage userWorkoutVolumesInThisWeek={await fetchCumulativeChartData()} />
            <Credit />
          </Container>
        </Suspense>
      </main>
    </>
  );
}
