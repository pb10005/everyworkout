import { WorkoutDetailPage } from "../../../components";
import { Heading, Navigation, Container } from "../../../components/server";

export default function Page() {

  return (
    <>
      <main className="mt-4">
        <Heading />
        <Navigation />
        <Container>
          <WorkoutDetailPage />
        </Container>
      </main>
    </>
  );
}
