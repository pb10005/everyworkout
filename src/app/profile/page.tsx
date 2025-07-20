"use client";
import { Container, Heading, Navigation } from "../../components/server";
import { ProfilePage } from "./ProfilePage";
// import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Page() {
  const {data: session} = useSession();
  const router = useRouter();
  // const session = await getServerSession(authOptions);
  if (!session?.user) router.push('/login');

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
