'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { api } from "../src/utils/api";

export interface SessionProviderProps {
    children: React.ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
    return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export default api.withTRPC(SessionProvider);
