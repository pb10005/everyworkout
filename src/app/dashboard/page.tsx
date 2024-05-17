import { AuthShowcase, Credit } from "../../components";
import { Heading, Navigation } from "../../components/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { Container } from "../../components/server";
import { DashboardPage } from "./DashboardPage";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation currentPage="dashboard" />
        <Container>
          <DashboardPage />
          <Credit />
        </Container>
      </main>
    </>
  );
}
