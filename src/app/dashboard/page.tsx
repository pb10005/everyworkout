
import { getServerSession, type Session } from "next-auth";
import { redirect } from "next/navigation";

import { prisma } from "../../server/db";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { Credit, Loading } from "../../components";
import { Heading, Navigation, Container } from "../../components/server";
import { DashboardPage } from "./DashboardPage";
import type { DailyVolumeProp } from "../../components/types";
import { Suspense, use } from "react";

type ContentProps = {
  session: Session;
};

function* cumulativeDaily(startDate: Date, data: DailyVolumeProp[]) {
  // ７日分の累計をとる（実績がなくても登録）
  let cumulative = 0;

  for (let i = 0; i < 7; i++) {
    const tmpDate = new Date(startDate);
    tmpDate.setDate(tmpDate.getDate() + i);
    const today = new Date().toISOString().split('T')[0] || '1975-01-01';

    if (tmpDate <= new Date(today)) {
      const daily = data.find(x => x.date.getDate() === tmpDate.getDate());
      cumulative += daily?.totalVolume || 0;
      yield { date: tmpDate.getTime(), cumulativeVolume: cumulative };
    } else {
      yield { date: tmpDate.getTime(), cumulativeVolume: 0 };
    }

  }
}

function Content(props: ContentProps) {
  const { session } = props;

  const cumulativeChartData = use((async () => {
    const data = await prisma.$queryRaw<{ max: string }[]>`select max("executeDate") from "WeeklyReportMaster";`;
    const dateQuery = new Date(data[0]?.max || '1975-01-01');

    const daily = await prisma.$queryRaw<DailyVolumeProp[]>`select date, sum("weight" * "reps" * "sets") "totalVolume" from "Workout" where "userId"=${session.user?.id} and to_char(date, 'yyyy-mm-dd') >= ${dateQuery.toISOString().split('T')[0]} and weight > 0 group by date order by date;`
    return Array.from(cumulativeDaily(dateQuery, daily));
  })());

  const goal = use(prisma.goal.findFirst({
    where: {
      userId: session.user?.id,
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 1
  }));

  return (<>
    <DashboardPage userWorkoutVolumesInThisWeek={cumulativeChartData} goal={goal}/>
  </>);
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation currentPage="dashboard" />
        <Container>
          <Suspense fallback={<Loading />}>
            <Content session={session} />
            <Credit />
          </Suspense>
        </Container>
      </main>
    </>
  );
}
