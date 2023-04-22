'use client';

import "../src/styles/globals.css";
import SessionProvider from "./SessionProvider";

import { api } from "../src/utils/api";

function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <html lang="ja">
                <head>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/icon.png"></link>
                    <meta name="theme-color" content="#fff" />
                </head>
                <body>{children}</body>
            </html>
        </SessionProvider>
    );
}

export default api.withTRPC(RootLayout);
