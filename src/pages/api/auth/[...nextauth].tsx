import NextAuth from "next-auth"
import { authOptions } from "@/server/auth.util"

export default NextAuth(authOptions)
