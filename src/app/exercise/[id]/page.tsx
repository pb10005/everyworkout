import { Container, Heading, Navigation } from "../../../components/server";
import { ExerciseDetailPage } from "./ExerciseDetailPage";

export default function Page() {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <ExerciseDetailPage />
        </Container>
      </main>
    </>
  );
}
