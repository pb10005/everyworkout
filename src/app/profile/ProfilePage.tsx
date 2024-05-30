"use client";

import { api } from "../../utils/api";

import { Button, Loading, Subheader } from "../../components";
import { useDarkMode } from "../../hooks/useDarkMode";

export const ProfilePage: React.FC = () => {

    const { data, isLoading, isSuccess } = api.profile.get.useQuery();
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <>
            <div className="m-2 md:m-0 flex flex-col gap-2">
                <section>
                    {isLoading && <Loading />}
                    {isSuccess && <>
                        <Subheader content="ログインユーザー(公開されません)" />
                        <div className="flex items-center gap-2">
                            {data?.image && <img src={data.image} width={60} alt="プロフィール画像"></img>}
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
            </div>
        </>
    );
};
