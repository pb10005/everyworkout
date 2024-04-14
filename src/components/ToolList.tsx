import { router } from "@trpc/server";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VoidFunctionComponent } from "react";

export const ToolList: React.FC = () => {
    const router = useRouter();
    const links = [
        { id: 1, label: "RM計算機", href: "/rm-calculator" },
        { id: 2, label: "タイマー", href: "/timer" },
    ];

    const handleLinkClick = (href: string) => {
        router.push(href);
    };

    return (
        <>
            <ul className="gap-1 divide-y bg-white">
                {links.map(d => <li key={d.id} className="py-2 px-4 cursor-pointer" onClick={() => void handleLinkClick(d.href)}>{d.label}</li>)}
            </ul>
        </>
    );
};

