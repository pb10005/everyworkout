import { AuthShowcase, Heading, Navigation, SearchPage } from "../../components";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <main>
        <Heading />
        <Navigation />
        {
          session?.user ? <SearchPage /> : <AuthShowcase />
        }
      </main>
    </>
  );
}
