import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL +"/auth/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          

          if(res.status === 201){
            const data = await res.json()
            console.log(data.data);
            const user = data.data
            return user
          }
          
          return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).access_token
        token.refreshToken = (user as any).refresh_token
        token.user = (user as any).user
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken =
          typeof token.accessToken === "string" ? token.accessToken : undefined
        session.user.refreshToken =
          typeof token.refreshToken === "string" ? token.refreshToken : undefined

          if (token.user) {
            const user = token.user as User
            session.user.idUser = user.id
            session.user.username = user.username
            session.user.role = user.role.name
          }
      }
      return session
    },
  },
  
  session: {
    strategy: "jwt", // <-- aquí le dices que use JWT
  },

})

export { handler as GET, handler as POST }