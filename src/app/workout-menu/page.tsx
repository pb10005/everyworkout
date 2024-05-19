import { PlusIcon } from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { FloatingButton } from "../../components";
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
            <FloatingButton href="/workout-menu/add">
                <PlusIcon className="w-10 h-10 text-white dark:text-gray-900"></PlusIcon>
            </FloatingButton>
            <Container>
                <WorkoutMenuPage />
            </Container>
        </main>
    </>);
}