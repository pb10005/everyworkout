import * as React from "react";
import Link from "next/link";

type CreditProps = {
    id: number;
    name: string;
    url: string;
    description?: string;
};

export const Credit: React.FC = () => {
    const credits: CreditProps[] = [
        { id: 1, name: 'Frameillust 無料イラスト素材集', url: 'https://frame-illust.com/' },
    ];
    return (
        <>
            <ul className="my-6">
                {credits.map(c => <>
                    <li key={c.id} className="flex gap-2 items-center">
                        <Link className="text-sm text-gray-700 dark:text-gray-300" href={c.url} target='_blank'>{c.name}</Link>
                        <span className="dark:text-white">{c.description}</span>
                    </li>
                </>)}
            </ul>
        </>
    );
};
