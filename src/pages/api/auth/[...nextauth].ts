import NextAuth, { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import prisma from "../../../../lib/context/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        return {
            id: profile.id.toString(),
            name: profile.name || profile.login,
            username: profile.login,
            email: profile.email,
            image: profile.avatar_url
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  //@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({session, user}) => ({
        ...session,
        user: {
            ...session.user,
            id: user.id,
            //@ts-expect-error custom property
            username: user.username
        }
    })
  }
};

export default NextAuth(authOptions)