import Link from "next/link";

export const ToolList: React.FC = () => {
    const links = [
        {id: 1, label: "RM計算機", href: "/rm-calculator"},
        {id: 2, label: "タイマー", href: "/timer"},
    ];
    return (
        <>  
              <ul className="gap-1 divide-y bg-white">
                {links.map(d => <li key={d.id} className="py-2 px-4"><Link href={d.href}>{d.label}</Link></li>)}
              </ul>
        </>
    );
};

