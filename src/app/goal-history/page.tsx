import { GoalHistoryPage } from "./GoalHistoryPage";
import { Container, Heading, Navigation } from "../../components/server";

export default function Page() {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <GoalHistoryPage />
        </Container>
      </main>
    </>
  );
}
