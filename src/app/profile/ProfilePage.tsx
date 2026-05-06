"use client";

import { api } from "../../utils/api";

import { Button, Loading, Subheader } from "../../components";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useNotification } from "../../hooks/useNotification";

export const ProfilePage: React.FC = () => {

    const { data, isLoading, isSuccess } = api.profile.get.useQuery();
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { permission, requestPermission } = useNotification();
    const { data: aiSettings } = api.userSettings.get.useQuery();

    return (
        <>
            <div className="m-2 md:m-0 flex flex-col gap-2 divide-y">
                <section>
                    {isLoading && <Loading />}
                    {isSuccess && <>
                        <Subheader content="ログインユーザー(公開されません)" variant="section" />
                        <div className="flex items-center gap-2">
                            {data?.image && <img src={data.image} width={60} alt="プロフィール画像"></img>}
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-bold dark:text-white">{data?.name}</div>
                                <div className="dark:text-white">{data?.email}</div>
                            </div>
                        </div>
                    </>}
                </section>
                <div className="flex items-center gap-2 p-2 justify-between">
                    <Button onClick={() => toggleDarkMode()}>ダークモード切り替え</Button>
                    <span className="dark:text-white">{darkMode === 'dark' ? 'ON' : 'OFF'}</span>
                </div>
                {permission && <div className="flex items-center gap-2 p-2 justify-between">
                    <Button onClick={() => void requestPermission(true)}>通知を許可</Button>
                    <span className="dark:text-white">{permission}</span>
                </div>}
                <div className="flex items-center gap-2 p-2 justify-between">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium dark:text-white">AI機能</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                            有効化は管理者にお問い合わせください
                        </span>
                    </div>
                    <span className={`text-sm font-bold ${aiSettings?.aiEnabled ? "text-green-500" : "text-gray-400"}`}>
                        {aiSettings?.aiEnabled ? "有効 🟢" : "未有効化 ⚪"}
                    </span>
                </div>
            </div>
        </>
    );
};
