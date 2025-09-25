import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: string
      refreshToken?: string
      idUser?: number
      username?: string
      role?: any
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    accessToken?: string
    refreshToken?: string
    id?: number
    username?: string
    role?: any
  }

  interface JWT {
    accessToken?: string
    refreshToken?: string
    user?: User
  }
}
