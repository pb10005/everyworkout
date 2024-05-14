import { AuthShowcase } from "../../components";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { SearchPage } from "./SearchPage";
import { Container, Heading, Navigation } from "../../components/server";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <main className="mt-4">
        <Heading />
        <Navigation />
        <Container>
          {
            session?.user ? <SearchPage /> : <AuthShowcase />
          }
        </Container>
      </main>
    </>
  );
}
