import { AuthShowcase, Loading } from "../../components";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { SearchPage } from "./SearchPage";
import { Container, Heading, Navigation } from "../../components/server";
import { Suspense } from "react";
import { prisma } from "../../server/db";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if(!session?.user) redirect('/login');

  const muslces = await prisma.muscle.findMany({
    include: {
      exercises: {
        select: {
          exercise: true
        }
      }
    }
  }) || [];

  const bodyParts = await prisma.bodyPart.findMany() || [];

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation currentPage="search" />
        <Suspense fallback={<Loading />}>
          <Container>
            <SearchPage muscles={muslces} bodyParts={bodyParts} />
          </Container>
        </Suspense>
      </main>
    </>
  );
}
