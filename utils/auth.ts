import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from 'prisma/db'
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import AppleProvider from "next-auth/providers/apple"
import { Role } from "types/customtypes"
import { User } from "@prisma/client"

const bcrypt = require('bcrypt')
interface CustomUser extends User {
    role: any
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            profile(profile) {
                return {
                    id: profile.sub, role: Role.Standard, email: profile.email, name: profile.name, emailVerified: new Date().getTime(), image: profile.picture, phoneNumber: "61999998888", password: "secret"
                }
            }
        }),
        AppleProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? ""
        }),
        FacebookProvider({
            clientId: process.env.APPLE_CLIENT_ID ?? "",
            clientSecret: process.env.APPLE_CLIENT_SECRET ?? ""
        }),
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials) {

                const { email, password } = credentials as {
                    email: string;
                    password: string;
                }

                const user: CustomUser | null = await prisma.user.findUnique({
                    where: { email: email },
                })
                if (user?.emailVerified == null)
                    throw Error('Unverified account')

                const match = await bcrypt.compare(password, user.password)
                if (!match)
                    throw Error('Invalid credentials')

                if (email !== user.email)
                    throw Error('Invalid credentials')

                return {
                    id: user.id, name: user.name, email: user.email, role: user?.role
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.SECRET
    },
    pages: {
        signIn: '/auth/login',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.role = user.role
                token.id = user.id
            }
            return token
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id,
                    session.role = token.role
            }
            return session
        },
    },
    events: {},
    debug: false,
}