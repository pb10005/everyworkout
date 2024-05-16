import { WorkoutMenuDetailPage } from "./WorkoutMenuDetailPage";
import { Heading, Navigation, Container } from "../../../components/server";

export default function Page() {
    return (<>
        <main className="md:mt-4">
            <Heading />
            <Navigation />
            <Container>
                <WorkoutMenuDetailPage />
            </Container>
        </main>
    </>);
}
