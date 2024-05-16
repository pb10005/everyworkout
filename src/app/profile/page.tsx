import { AuthShowcase } from "../../components";
import { Container, Heading, Navigation } from "../../components/server";
import { ProfilePage } from "./ProfilePage";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation currentPage="profile"/>
        <Container>
          {session?.user ? <ProfilePage /> : <AuthShowcase />}
        </Container>
      </main>
    </>
  );
}
