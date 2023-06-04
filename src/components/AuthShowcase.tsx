import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center">
                {sessionData && (
                    <Link
                        href="/dashboard"
                        className="rounded-full px-10 py-3 font-semibold no-underline shadow"
                    >
                        Dashboard
                    </Link>
                )}
            </p>
            <button
                className="rounded-full px-10 py-3 font-semibold no-underline shadow"
                onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
                {sessionData ? "Sign out" : "Sign in"}
            </button>
        </div>
    );
};

