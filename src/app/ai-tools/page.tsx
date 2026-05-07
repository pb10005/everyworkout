import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Container, Heading, Navigation } from "../../components/server";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { AiToolsPage } from "./AiToolsPage";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  return (
    <main className="md:mt-4">
      <Heading />
      <Navigation currentPage="ai-tools" />
      <Container>
        <AiToolsPage />
      </Container>
    </main>
  );
}
