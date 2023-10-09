import { User as PrismaUser } from "@prisma/client"
import NextAuth from "next-auth"
import { DefaultUser } from "next-auth"
import { Invitation, Payment } from "./customtypes"

// common interface for JWT and Session
interface IUser extends DefaultUser {
  invitations?: Invitation[],
  payments?: Payment[],
  role?: string,
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    expires: string,
    id: string,
    role?: string
    & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}