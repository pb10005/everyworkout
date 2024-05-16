import { AuthShowcase, Loading } from "../../components";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { SearchPage } from "./SearchPage";
import { Container, Heading, Navigation } from "../../components/server";
import { Suspense } from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const muslces = await prisma?.muscle.findMany({
    include: {
      exercises: {
        select: {
          exercise: true
        }
      }
    }
  }) || [];

  const bodyParts = await prisma?.bodyPart.findMany() || [];

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation currentPage="search" />
        <Suspense fallback={<Loading />}>
          <Container>
            {
              session?.user ? <SearchPage muscles={muslces} bodyParts={bodyParts} /> : <AuthShowcase />
            }
          </Container>
        </Suspense>
      </main>
    </>
  );
}
