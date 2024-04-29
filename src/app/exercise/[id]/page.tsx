import { Heading, Navigation, ExerciseDetailPage } from "../../../components";

export default function Page() {
  return (
    <>
      <main>
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12 dark:bg-gray-900">
          <div className="md:col-span-6 md:col-start-4">
            <ExerciseDetailPage />
          </div>
        </div>
      </main>
    </>
  );
}
