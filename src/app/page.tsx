'use client'
import { getSession, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  // const session = useRequireAuth();
  // if (!session) return <div>loading...</div>;

  return (
    <div>
      <h1>{`Seja bem-vindo ${session?.user?.name}`}</h1>
      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
}












