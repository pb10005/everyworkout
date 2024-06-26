import { WorkoutDetailPage } from "./WorkoutDetailPage";
import { Heading, Navigation, Container } from "../../../components/server";

export default function Page() {

  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <WorkoutDetailPage />
        </Container>
      </main>
    </>
  );
}
