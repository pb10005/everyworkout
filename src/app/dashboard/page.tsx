
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

  function* cumulativeDaily(startDate: Date, data: DailyVolumeProp[]) {
    // ７日分の累計をとる（実績がなくても登録）
    let cumulative = 0;

    for (let i = 0; i < 7; i++) {
      const tmpDate = new Date(startDate);
      tmpDate.setDate(tmpDate.getDate() + i);

      const daily = data.find(x => x.date.getDate() === tmpDate.getDate());
      cumulative += daily?.totalVolume || 0;
      console.log(daily, cumulative)
      yield { date: tmpDate.getTime(), cumulativeVolume: cumulative };

    }
  }

  const fetchCumulativeChartData = async () => {
    const data = await prisma.$queryRaw<{ max: string }[]>`select max("executeDate") from "WeeklyReportMaster";`;
    const dateQuery = new Date(data[0]?.max || '1975-01-01');

    const daily = await prisma.$queryRaw<DailyVolumeProp[]>`select date, sum("weight" * "reps" * "sets") "totalVolume" from "Workout" where "userId"=${session.user?.id} and to_char(date, 'yyyy-mm-dd') >= ${dateQuery.toISOString().split('T')[0]} and weight > 0 group by date order by date;`
    return Array.from(cumulativeDaily(dateQuery, daily));
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
