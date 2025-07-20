import { Suspense } from "react";
import { GoalEditPage } from "./GoalEditPage";
import { Container, Heading, Navigation } from "../../components/server";
import { Loading } from "../../components";

export default function Page() {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <Suspense fallback={<Loading />}>
            <GoalEditPage />
          </Suspense>
        </Container>
      </main>
    </>
  );
}
