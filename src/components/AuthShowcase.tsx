import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Loading } from ".";

export const AuthShowcase: React.FC = () => {
    const { data: sessionData, status } = useSession();

    return (
        <>
            <div>
                {status === "loading" && <Loading />}
                {status !== "loading" && <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-center">
                        {sessionData && (
                            <Link
                                href="/dashboard"
                                className="rounded-full px-10 py-3 font-semibold no-underline shadow bg-white"
                            >
                                Dashboard
                            </Link>
                        )}
                    </p>
                    <button
                        className="rounded-full px-10 py-3 font-semibold no-underline shadow bg-white"
                        onClick={sessionData ? () => void signOut() : () => void signIn(undefined, { callbackUrl: "/" })}
                    >
                        {sessionData ? "Sign out" : "Sign in"}
                    </button>
                </div>}
            </div>
        </>
    );
};

