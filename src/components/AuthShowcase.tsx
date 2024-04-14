import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Loading, Button } from ".";
import { useRouter } from "next/navigation";
import { router } from "@trpc/server";

export const AuthShowcase: React.FC = () => {
    const { data: sessionData, status } = useSession();
    const router = useRouter();

    return (
        <>
            <div>
                {status === "loading" && <Loading />}
                {status !== "loading" && <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-center">
                        {sessionData && (
                            <Button
                                onClick={() => router.push("/dashboard")}
                            >
                                Dashboard
                            </Button>
                        )}
                    </p>
                    <Button
                        onClick={sessionData ? () => void signOut() : () => void signIn(undefined, { callbackUrl: "/dashboard" })}
                        layout="danger"
                    >
                        {sessionData ? "ログアウト" : "ログイン"}
                    </Button>
                </div>}
            </div>
        </>
    );
};

