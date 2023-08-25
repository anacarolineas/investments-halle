'use client'
import Sidebar from "@/components/shared/sidebar";
import "./globals.css";
import NextAuthSession from "./providers/sessionProvider";
import { styled } from "styled-components";

export const metadata = {
    title: "Carteira Investimentos",
    description: "learning next js 13",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const MainStyled = styled.main`
    
    `;

    const ContainerGrid = styled.div`
        margin: 0;
        padding: 0;
        height: 100vh;
        display: grid;
        grid-template-columns: 64px 1fr;
    `;
    return (
        <html lang='en'>
            <body>
                <NextAuthSession>
                    <ContainerGrid>
                        <Sidebar />
                        <main>
                            {children}
                        </main>  
                    </ContainerGrid>                          
                </NextAuthSession>
            </body>
        </html>
    )
}