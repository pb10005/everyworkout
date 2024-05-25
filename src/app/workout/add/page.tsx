import { Suspense, use } from "react";
import { Loading } from "../../../components";
import { Heading, Navigation, Container } from "../../../components/server";
import { AddWorkoutPage } from "./AddWorkoutPage";
import { prisma } from "../../../server/db";

function Content() {
  const muslces = use(prisma.muscle.findMany({
    include: {
      exercises: {
        select: {
          exercise: true
        }
      }
    }
  })) || [];

  const bodyParts = use(prisma.bodyPart.findMany()) || [];

  return (<>
    <AddWorkoutPage muscles={muslces} bodyParts={bodyParts}/>
  </>)

}

export default function Page() {
    
    return (<>
        <main className="md:mt-4">
            <Heading />
            <Navigation />
            <Container>
                <Suspense fallback={<Loading />}>
                <Content />
                </Suspense>
            </Container>
        </main>
    </>);
}
