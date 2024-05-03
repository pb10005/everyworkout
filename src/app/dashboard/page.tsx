import { Heading, Navigation, DashboardPage, AuthShowcase, ToolList, Credit } from "../../components";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <main>
        <Heading />
        <Navigation />

        <div className="grid md:grid-cols-12">
          <div className="mt-2 md:col-span-6 md:col-start-4 gap-2">
            <section className="p-2">
              <p className="text-sm text-gray-500 dark:text-gray-200">便利ツール</p>
              <ToolList />
            </section>
            {
              session?.user ? <DashboardPage /> : <AuthShowcase />
            }
            <Credit />
          </div>
        </div>
      </main>
    </>
  );
}
