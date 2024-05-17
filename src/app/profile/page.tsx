import { AuthShowcase } from "../../components";
import { Container, Heading, Navigation } from "../../components/server";
import { ProfilePage } from "./ProfilePage";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation currentPage="profile" />
        <Container>
          <ProfilePage />
        </Container>
      </main>
    </>
  );
}
