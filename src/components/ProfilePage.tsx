"use client";

import { api } from "../utils/api";

import { Button, Loading } from "../components";
import { useDarkMode } from "../hooks/useDarkMode";

export const ProfilePage: React.FC = () => {

    const { data, isLoading, isSuccess } = api.profile.get.useQuery();
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <>
            <section className="p-2">
                {isLoading && <Loading />}
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
            <div className="flex items-center">
                <Button onClick={() => toggleDarkMode()}>ダークモード切り替え</Button>
                <span className="dark:text-white p-2">{darkMode === 'dark' ? 'ON' : 'OFF'}</span>
            </div>
        </>
    );
};
