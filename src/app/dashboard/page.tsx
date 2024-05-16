import { AuthShowcase, ToolList, Credit, Subheader } from "../../components";
import { Heading, Navigation } from "../../components/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { Container } from "../../components/server";
import { DashboardPage } from "./DashboardPage";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <main className="mt-4">
        <Heading />
        <Navigation />
        <Container>
            <section>
              <Subheader content="便利ツール" />
              <ToolList />
            </section>
            {
              session?.user ? <DashboardPage /> : <AuthShowcase />
            }
            <Credit />
          </Container>
      </main>
    </>
  );
}
