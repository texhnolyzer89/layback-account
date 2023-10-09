import { prisma } from 'prisma/db'
import jwt from 'jsonwebtoken'
import { JwtPayload, Role } from 'types/customtypes'
const bcrypt = require('bcrypt')

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')
        const email = searchParams.get('email')
        if (email) {
            const user = await prisma.user.findFirst({
                where: { email: email },
            })
            return new Response(JSON.stringify(user), { status: 200 })
        }
        else if (userId) {
            const user = await prisma.user.findFirst({
                where: { id: userId },
            })
            return new Response(JSON.stringify(user), { status: 200 })
        }
        // TODO: Only admin roles may fetch all users
        else {
            const users = await prisma.user.findMany()
            return new Response(JSON.stringify(users), { status: 200 })
        }
    } catch (e) {
        console.log(e)
        return new Response('Something went wrong', { status: 500 })
    }
}

const getPasswordHash = async (plainPassword: string) => {
    const saltRounds = 10
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainPassword, saltRounds, (err: any, hash: string) => {
            if (err) {
                reject(err)
            } else {
                resolve(hash)
            }
        })
    })
}

export async function POST(req: Request) {
    const request_body = await req.json()
    try {
        // Create user
        if (request_body?.email && request_body?.password && request_body?.telephone_number) {
            const password_len = Buffer.byteLength(request_body?.password, "utf-8")
            if (password_len > 72)
                return new Response('Password too long', { status: 400 })

            const password_hash = await getPasswordHash(request_body?.password)
            if (typeof password_hash === "string") {
                await prisma.user.create({
                    data: {
                        email: request_body?.email,
                        password: password_hash,
                        role: Role.Standard,
                        phoneNumber: request_body?.telephone_number,
                    },
                })

                const JWT_SECRET = process.env.SECRET
                const payload = {
                    email: request_body?.email
                }

                const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: '15m' })
                const serverIP = process.env.NODE_ENV === "production" ? process.env.PUBLIC_IP : "http://localhost:3000/"
                const link = `${serverIP}auth/confirm-password/${token}`

                return new Response(link, { status: 200 })
            }
        }
        // Send email to receive password link
        else if (request_body?.email && !request_body?.telephone_number && !request_body?.password) {
            const user = await prisma.user.findUnique({
                where: { email: request_body?.email }
            })
            if (!user)
                return new Response('Email provided does not exist in our database', { status: 500 })

            const JWT_SECRET = process.env.SECRET ?? ""
            const payload = {
                email: request_body?.email
            }

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' })
            const link = `http://localhost:3000/auth/reset-password/${token}`

            return new Response(JSON.stringify(link), { status: 200 })
        }
    } catch (e) {
        console.log(e)
        return new Response('Error creating user', { status: 500 })
    }
    return new Response('Error creating user', { status: 500 })
}

export async function PUT(req: Request) {
    const JWT_SECRET = process.env.SECRET ?? ""
    const request_body = await req.json()
    try {
        // Reset password
        if (request_body?.password && request_body?.jwt && JWT_SECRET) {
            const payload = jwt.verify(request_body?.jwt, JWT_SECRET) as JwtPayload
            const password_hash = await getPasswordHash(request_body?.password)

            if (typeof password_hash === "string") {
                const updated_user = await prisma.user.update({
                    where: { email: payload?.email },
                    data: { password: password_hash },
                })
                return new Response(JSON.stringify(updated_user), { status: 200 })
            }
        }
        // Update password
        else if (request_body?.password && request_body?.email && !request_body?.jwt) {
            const password_hash = await getPasswordHash(request_body?.password)
            if (typeof password_hash === "string") {
                const updated_user = await prisma.user.update({
                    where: { email: request_body?.email },
                    data: { password: password_hash },
                })
                return new Response(JSON.stringify(updated_user), { status: 200 })
            }
        }
        // Update email
        else if (request_body?.email && request_body?.newEmail) {
            try {
                const updated_user = await prisma.user.update({
                    where: { email: request_body?.email },
                    data: { email: request_body?.newEmail },
                })
                return new Response(JSON.stringify(updated_user), { status: 200 })
            } catch (e) {
                console.log(e)
                return new Response('Something went wrong', { status: 500 })
            }

        }
        // Update emailVerified
        else if (request_body?.jwt) {
            const payload = jwt.verify(request_body?.jwt, JWT_SECRET) as JwtPayload
            console.log(payload)
            const user = await prisma.user.findFirst({
                where: { email: payload?.email }
            })
            console.log(user)
            if (user && !user?.emailVerified) {
                const updated_user = await prisma.user.update({
                    where: { email: payload?.email },
                    data: { emailVerified: new Date },
                })
                return new Response(JSON.stringify(updated_user), { status: 200 })
            }
            else if (user && user?.emailVerified)
                return new Response("Account already verified", { status: 200 })
            else return new Response('Error updating user', { status: 500 })
        }
        // Update role
        else if (request_body?.email && (request_body?.newRole === Role.Admin || request_body?.newRole === Role.Standard)) {
            console.log(request_body)
            const updated_user = await prisma.user.update({
                where: { email: request_body?.email },
                data: { role: request_body?.newRole },
            })
            return new Response(JSON.stringify(updated_user), { status: 200 })
        } else return new Response('Something went wrong', { status: 500 })
    } catch (e) {
        console.log(e)
        return new Response('Error updating user', { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const userEmail = searchParams.get('userEmail')
    if (userEmail) {
        let exception
        const user = (await prisma.user
            .delete({
                where: {
                    email: userEmail,
                },
            })
            .catch((error) => { exception = error })) as any
        if (!user && exception) {
            const e = {
                status: 400,
                type: 'Bad Request',
                message: exception,
            }
            return new Response(JSON.stringify(exception), { status: 500 })
        } else return new Response(JSON.stringify(user), { status: 200 })
    } else if (userId) {
        let exception
        const user = (await prisma.user
            .delete({
                where: {
                    id: userId,
                },
            })
            .catch((error) => { exception = error })) as any
        if (!user && exception) {
            const e = {
                status: 400,
                type: 'Bad Request',
                message: exception,
            }
            return new Response(JSON.stringify(exception), { status: 500 })
        } else return new Response(JSON.stringify(user), { status: 200 })
    }
    return new Response("Error deleting user", { status: 500 })
}