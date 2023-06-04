"use client";

import { type NextPage } from "next";
import { api } from "../../src/utils/api";

import { AuthShowcase } from "../../src/components";
import { Heading, Navigation } from "../../src/components";

const Profile: NextPage = () => {

  const { data, isLoading, isSuccess } = api.profile.get.useQuery();

  return (
    <>
      <main className="h-screen bg-gray-50">
        <Heading />
        <Navigation />
        <div className="grid md:grid-cols-12">
          <div className="md:col-span-6 md:col-start-4">
            <section className="mb-2 p-2">
              {isSuccess && <>
                <p className="text-sm text-gray-500">ログインユーザー(公開されません)</p>
                {data?.image && <img src={data.image}></img>}
                <div className="text-lg font-bold">{data?.name}</div>
                <div>{data?.email}</div>
              </>}
            </section>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
