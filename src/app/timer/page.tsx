import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { TimerPageClient } from "./TimerPageClient";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  return <TimerPageClient />;
}
