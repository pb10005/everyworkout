import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Heading, Navigation, Container } from "../../components/server";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { WorkoutMenuPage } from "./WorkoutMenuPage";


export default async function Page() {
    const session = await getServerSession(authOptions);
    if(!session?.user) redirect('/login');

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