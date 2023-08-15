"use client"
import { SessionProvider } from "next-auth/react";

export default function NextAuthSession({children}: Props) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

interface Props {
    children?: React.ReactNode;
}