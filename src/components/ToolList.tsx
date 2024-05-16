import { useRouter } from "next/navigation";
import { ListContainer } from "./ListConteiner";

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
            <ListContainer>
                {links.map(d => <li key={d.id} className="py-2 px-4 cursor-pointer dark:text-white" onClick={() => void handleLinkClick(d.href)}>{d.label}</li>)}
            </ListContainer>
        </>
    );
};

