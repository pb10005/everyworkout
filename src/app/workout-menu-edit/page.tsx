import { WorkoutMenuEditPage } from "./WorkoutMenuEditPage";
import { Container, Heading, Navigation } from "../../components/server";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <WorkoutMenuEditPage />
          </Suspense>
        </Container>
      </main>
    </>
  );
}
