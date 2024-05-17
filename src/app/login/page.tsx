import { AuthShowcase } from "../../components";
import { Heading, Navigation } from "../../components/server";
import { Container } from "../../components/server";

export default function Page() {
  return (
    <>
      <main className="md:mt-4">
        <Heading />
        <Navigation />
        <Container>
          <AuthShowcase />
        </Container>
      </main>
    </>
  );
}
