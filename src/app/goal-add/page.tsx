import { Suspense } from "react";
import { Container, Heading, Navigation } from "../../components/server";
import { GoalAddPage } from "./GoalAddPage";
import { Loading } from "../../components";

export default function Page() {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <Suspense fallback={<Loading />}>
            <GoalAddPage />
          </Suspense>
        </Container>
      </main>
    </>
  );
}
