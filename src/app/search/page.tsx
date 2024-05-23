import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense, use } from "react";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { SearchPage } from "./SearchPage";
import { Loading } from "../../components";
import { Container, Heading, Navigation } from "../../components/server";
import { prisma } from "../../server/db";

function Content() {
  const muslces = use(prisma.muscle.findMany({
    include: {
      exercises: {
        select: {
          exercise: true
        }
      }
    }
  })) || [];

  const bodyParts = use(prisma.bodyPart.findMany()) || [];

  return (<>
    <SearchPage muscles={muslces} bodyParts={bodyParts} />
  </>)
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation currentPage="search" />
        <Container>
          <Suspense fallback={<Loading />}>
            <Content />
          </Suspense>
        </Container>
      </main>
    </>
  );
}
