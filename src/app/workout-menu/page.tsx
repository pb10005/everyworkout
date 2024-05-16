import { PlusIcon } from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth/next";
import { FloatingButton, AuthShowcase } from "../../components";
import { Heading, Navigation, Container } from "../../components/server";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { WorkoutMenuPage } from "./WorkoutMenuPage";


export default async function Page() {
    const session = await getServerSession(authOptions);

    return (<>
        <main className="md:mt-4">
            <Heading />
            <Navigation currentPage="workout-menu"/>
            <FloatingButton href="/workout-menu/add">
                <PlusIcon className="w-10 h-10 text-white dark:text-gray-900"></PlusIcon>
            </FloatingButton>
            <Container>
                {
                    session?.user ? <WorkoutMenuPage /> : <AuthShowcase />
                }
            </Container>
        </main>
    </>);
}