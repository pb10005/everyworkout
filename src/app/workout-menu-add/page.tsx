import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { WorkoutMenuAddPage } from "./WorkoutMenuAddPage";
import { Container, Heading, Navigation } from "../../components/server";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <WorkoutMenuAddPage />
        </Container>
      </main>
    </>
  );
}
