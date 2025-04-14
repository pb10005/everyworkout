import { useRouter } from "next/navigation";
import { ListContainer } from ".";
import { CalculatorIcon, ClockIcon } from "@heroicons/react/24/outline";

export const ToolList: React.FC = () => {
    const router = useRouter();
    const links = [
        { id: 1, label: "RM計算機", href: "/rm-calculator", icon: <CalculatorIcon className="w-5 h-5 text-blue-500" /> },
        { id: 2, label: "タイマー", href: "/timer", icon: <ClockIcon className="w-5 h-5 text-blue-500" /> },
    ];

    const handleLinkClick = (href: string) => {
        router.push(href);
    };

    return (
        <ListContainer variant="with-icons">
            {links.map(d => (
                <li 
                    key={d.id} 
                    className="cursor-pointer dark:text-white flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    onClick={() => void handleLinkClick(d.href)}
                >
                    {d.icon}
                    <span>{d.label}</span>
                </li>
            ))}
        </ListContainer>
    );
};
