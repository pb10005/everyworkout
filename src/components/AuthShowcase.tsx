import { signIn, signOut, useSession } from "next-auth/react";
import { Loading, Button } from ".";
import { useRouter } from "next/navigation";

export const AuthShowcase: React.FC = () => {
    const { data: sessionData, status } = useSession();
    const router = useRouter();

    return (
        <>
            <div>
                {status === "loading" && <Loading />}
                {status !== "loading" && <div className="flex flex-col items-center justify-center gap-4">
                    {sessionData ? <>
                        <Button
                            onClick={() => router.push("/dashboard")}
                        >
                            Dashboard
                        </Button>
                        <Button
                            onClick={() => void signOut()}
                            layout="danger"
                        >ログアウト</Button>
                    </> : <>
                        <Button
                            onClick={() => void signIn(undefined, { callbackUrl: "/dashboard" })}
                        >
                            ログイン
                        </Button>
                    </>}
                </div>}
            </div>
        </>
    );
};

