import Sidebar from "@/components/shared/sidebar";
import "./globals.css";
import NextAuthSession from "./providers/sessionProvider";

export const metadata = {
    title: "Carteira Investimentos",
    description: "learning next js 13",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body>
                <NextAuthSession>
                    <Sidebar />
                    <main className="">
                        {children}
                    </main>           
                </NextAuthSession>
            </body>
        </html>
    )
}