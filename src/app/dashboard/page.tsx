import { AuthShowcase, ToolList, Credit } from "../../components";
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
            <section className="p-2">
              <p className="text-sm text-gray-500 dark:text-gray-200">便利ツール</p>
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
