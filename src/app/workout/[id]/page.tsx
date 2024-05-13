import { Heading, Navigation, WorkoutDetailPage } from "../../../components";

export default function Page() {

  return (
    <>
      <main className="mt-4">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4 p-2 flex flex-col gap-2">
            <WorkoutDetailPage />
          </div>
        </div>
      </main>
    </>
  );
}
