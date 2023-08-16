import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/server/db.util"
import bcrypt from "bcryptjs"
import { AuthOptions } from "next-auth"

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const user = await prisma.credentials.findUnique({
          where: { username: credentials.username },
        })

        if (!user) return null
        if (!(await bcrypt.compare(credentials.password, user.password))) return null

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
} satisfies AuthOptions
