import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { Container, Heading, Navigation } from "../../components/server";
import { BodyWeightPage } from "./BodyWeightPage";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <BodyWeightPage />
        </Container>
      </main>
    </>
  );
}
