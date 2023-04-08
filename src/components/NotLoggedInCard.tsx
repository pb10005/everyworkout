import * as React from "react";
import Link from "next/link";

export const NotLoggedInCard: React.FC = () => {
    return (
        <>
            <div className="w-full flex justify-between rounded-lg bg-red-100 shadow px-2 py-4">
                <section>
                    <p className="text-lg font-bold mb-2">
                        まだログインしていません
                    </p>
                    <Link className="bg-red-600 text-white rounded shadow p-2" href="/">ログイン</Link>
                </section>
            </div>
        </>
    );
};
