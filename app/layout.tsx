import "../src/styles/globals.css";
import SessionProvider from "./SessionProvider";
import { ClientProvider } from "./trpcClient";

export const metadata = {
    title: 'Every Workout',
    description: 'ワークアウトの成長を記録する',
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
                    <body>{children}</body>
                </html>
            </ClientProvider>
        </SessionProvider>
    );
}

export default RootLayout;