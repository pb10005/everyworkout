"use client";

import { type NextPage } from "next";
import { api } from "../../src/utils/api";

import { AuthShowcase, Button } from "../../src/components";
import { Heading, Navigation } from "../../src/components";
import { useDarkMode } from "../../src/hooks/useDarkMode";

const Profile: NextPage = () => {

  const { data, isLoading, isSuccess } = api.profile.get.useQuery();
  const { toggleDarkMode } = useDarkMode();

  return (
    <>
      <main className="mt-4">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4 rounded-lg dark:outline outline-1 outline-gray-500 p-2">
            <section className="mb-2 p-2">
              {isSuccess && <>
                <p className="text-sm text-gray-700 dark:text-gray-300">ログインユーザー(公開されません)</p>
                <div className="flex items-center gap-2">
                  {data?.image && <img src={data.image} width={60}></img>}
                  <div className="flex flex-col gap-1">
                    <div className="text-lg font-bold dark:text-white">{data?.name}</div>
                    <div className="dark:text-white">{data?.email}</div>
                  </div>
                </div>
              </>}
            </section>
            <Button onClick={() => toggleDarkMode()}>ダークモード切り替え</Button>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
