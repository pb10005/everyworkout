import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { SearchPage } from "./SearchPage";
import { Loading } from "../../components";
import { Container, Heading, Navigation } from "../../components/server";
import { prisma } from "../../server/db";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const muslces = async () => {
    return await prisma.muscle.findMany({
      include: {
        exercises: {
          select: {
            exercise: true
          }
        }
      }
    }) || [];
  }

  const bodyParts = async () => await prisma.bodyPart.findMany() || [];

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation currentPage="search" />
        <Suspense fallback={<Loading />}>
          <Container>
            <SearchPage muscles={await muslces()} bodyParts={await bodyParts()} />
          </Container>
        </Suspense>
      </main>
    </>
  );
}