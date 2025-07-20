"use client";
import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth/next";
import { useRouter } from "next/navigation";
import { Heading, Navigation, Container } from "../../components/server";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { WorkoutMenuPage } from "./WorkoutMenuPage";


export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();
    // const session = await getServerSession(authOptions);
    if(!session?.user) router.push('/login');

    return (<>
        <main className="md:mt-4">
            <Heading />
            <Navigation currentPage="workout-menu"/>
            <Container>
                <WorkoutMenuPage />
            </Container>
        </main>
    </>);
}