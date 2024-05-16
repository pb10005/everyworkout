import {
  Heading,
  Navigation,
  Container,
} from "../../../../components/server";
import { EditGoalPage } from "./EditGoalPage";

export default function Page() {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <EditGoalPage />
        </Container>
      </main>
    </>
  );
}
