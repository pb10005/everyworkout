import { WorkoutRecorderPage } from "./WorkoutRecorderPage";
import { Container, Heading, Navigation } from "../../components/server";

export default function Page() {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <WorkoutRecorderPage />
        </Container>
      </main>
    </>
  );
}
