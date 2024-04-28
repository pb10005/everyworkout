import { Heading, Navigation, ProfilePage, AuthShowcase } from "../../src/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../../src/pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <main className="mt-4">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4 rounded-lg dark:outline outline-1 outline-gray-500 p-2 flex flex-col gap-2">
            { session?.user ? <ProfilePage /> : <AuthShowcase /> }
          </div>
        </div>
      </main>
    </>
  );
}
