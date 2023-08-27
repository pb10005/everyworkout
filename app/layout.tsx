import "../src/styles/globals.css";
import SessionProvider from "./SessionProvider";
import { ClientProvider } from "./trpcClient";

export const metadata = {
    title: 'Every Workout',
    description: 'ワークアウトの成長を記録する',
    twitter: {
        card: "summary_large_image",
        title: "EVERYWORKOUT",
        description: "ワークアウト記録",
    },
};

function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <ClientProvider>
                <html lang="ja">
                    <head>
                        <link rel="manifest" href="/manifest.json" />
                        <link rel="apple-touch-icon" href="/icon.png"></link>
                        <meta name="theme-color" content="#fff" />
                    </head>
                    <body className="bg-gray-100">{children}</body>
                </html>
            </ClientProvider>
        </SessionProvider>
    );
}

export default RootLayout;
