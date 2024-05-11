import {
    Heading,
    Navigation,
    GoalHistoryPage
  } from "../../../components";
  
  export default function Page() {
    return (
      <>
        <main>
          <Heading />
          <Navigation />
          <div className="grid md:grid-cols-12 mt-4">
            <div className="md:col-span-6 md:col-start-4 bg-white rounded-lg p-2 grid gap-2 dark:bg-gray-900 dark:outline outline-1 outline-gray-500">
             <GoalHistoryPage />
            </div>
          </div>
        </main>
      </>
    );
  }
  