import {
  Heading,
  Navigation,
} from "../../../components/server";
import { Container } from "../../../components/server";

import { AddGoalPage } from "./AddGoalPage";

export default function Page() {
  return (
    <>
      <main className="mt-4">
        <Heading />
        <Navigation />
        <Container>
          <AddGoalPage />
        </Container>
      </main>
    </>
  );
}
