import { prisma } from 'prisma/db'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { getServerSession } from 'next-auth'
const bcrypt = require('bcrypt')
const product1 = process.env.NODE_ENV === "development" ? "http://localhost:3001/" : process.env.PRODUCT1_PUBLIC_IP
const product2 = process.env.NODE_ENV === "development" ? "http://localhost:3002/" : process.env.PRODUCT2_PUBLIC_IP

export async function GET(req: any) {
    try {
        const session = await getServerSession()
        const { searchParams } = new URL(req.url)
        const token = searchParams.get('token')

        let decodedToken: any = ""
        try {
            decodedToken = jwt.verify(token ?? "", process.env.PRODUCT1_SECRET ?? "")
        } catch { }
        try {
            decodedToken = jwt.verify(token ?? "", process.env.PRODUCT2_SECRET ?? "")
        } catch { }
        if (!decodedToken.startsWith(product1) && !decodedToken.startsWith(product2)) return new Response('Invalid token', { status: 401 })

        const clientIP = req.headers.get('x-real-ip') || req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || req.headers.get('x-client-ip')
        const geolocationResponse = await axios.get(`http://api.ipstack.com/check?access_key=b7b8c20327a816258cde0b884cd37174`)

        if (clientIP && geolocationResponse.data && session?.user) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email ?? ""
                }
            })
            if (decodedToken.startsWith(product1)) {
                const currentTime = new Date()
                const tenSecondsAgo = new Date(currentTime.getTime() - 10 * 1000)
                const recentLogin = await prisma.login.findFirst({
                    where: {
                        userId: user?.id,
                        time: {
                            gte: tenSecondsAgo,
                            lte: currentTime,
                        },
                    },
                })
                if(!recentLogin) {
                    await prisma.login.create({
                        data: {
                            product: "product1",
                            ip: clientIP,
                            geolocation: JSON.stringify(geolocationResponse.data),
                            time: new Date(),
                            User: {
                                connect: { id: user?.id }
                            }
                        }
                    })
                    const access_token = jwt.sign({ user: user }, process.env.SECRET ?? "", { expiresIn: '1h' })
                    return new Response(`${decodedToken}/${access_token}`, { status: 200 })
                }
            }
            else if (decodedToken.startsWith(product2)) {
                const currentTime = new Date()
                const tenSecondsAgo = new Date(currentTime.getTime() - 10 * 1000)
                const recentLogin = await prisma.login.findFirst({
                    where: {
                        userId: user?.id,
                        time: {
                            gte: tenSecondsAgo,
                            lte: currentTime,
                        },
                    },
                })
                if (!recentLogin) {
                    await prisma.login.create({
                        data: {
                            product: "product2",
                            ip: clientIP,
                            geolocation: JSON.stringify(geolocationResponse.data),
                            time: new Date(),
                            User: {
                                connect: { id: user?.id }
                            }
                        }
                    })
                    const access_token = jwt.sign({ user: user }, process.env.SECRET ?? "", { expiresIn: '1h' })
                    return new Response(`${decodedToken}/${access_token}`, { status: 200 })
                }
            }
        }
        return new Response('Something went wrong', { status: 500 })
    }
    catch (e) {
        console.log(e)
        return new Response('Something went wrong', { status: 500 })
    }
}

export async function POST(req: Request) {
    const request_body = await req.json()

    const token = request_body.jwt
    const email = request_body.email
    const password = request_body.password

    try {
        let decodedToken: any = ""
        try {
            decodedToken = jwt.verify(token, process.env.PRODUCT1_SECRET ?? "")
        } catch { }
        try {
            decodedToken = jwt.verify(token, process.env.PRODUCT2_SECRET ?? "")
        } catch { }
        if (!decodedToken.startsWith(product1) && !decodedToken.startsWith(product2)) return new Response('Invalid token', { status: 401 })

        const user = await prisma.user.findUnique({
            where: { email: email },
        })

        if (!user) {
            return new Response('User not found', { status: 500 })
        } else {
            if (user?.emailVerified == null)
                return new Response('Email not verified', { status: 500 })

            const match = await bcrypt.compare(password, user.password)
            if (!match)
                return new Response('Invalid credentials', { status: 401 })

            // Track Login, IP and Geolocation
            const clientIP = req.headers.get('x-real-ip') || req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || req.headers.get('x-client-ip')
            const geolocationResponse = await axios.get(`http://api.ipstack.com/check?access_key=b7b8c20327a816258cde0b884cd37174`)

            if (clientIP && geolocationResponse.data) {
                if (decodedToken.startsWith(product1)) {
                    await prisma.login.create({
                        data: {
                            product: "product1",
                            ip: clientIP,
                            geolocation: JSON.stringify(geolocationResponse.data),
                            time: new Date(),
                            User: {
                                connect: { id: user?.id }
                            }
                        }
                    })
                    const access_token = jwt.sign({ user: user }, process.env.SECRET ?? "", { expiresIn: '1h' })
                    return new Response(`${decodedToken}/${access_token}`, { status: 200 })
                }
                else if (decodedToken.startsWith(product2)) {
                    await prisma.login.create({
                        data: {
                            product: "product2",
                            ip: clientIP,
                            geolocation: JSON.stringify(geolocationResponse.data),
                            time: new Date(),
                            User: {
                                connect: { id: user?.id }
                            }
                        }
                    })
                    const access_token = jwt.sign({ user: user }, process.env.SECRET ?? "", { expiresIn: '1h' })
                    return new Response(`${decodedToken}/${access_token}`, { status: 200 })
                }
                else return new Response('Error logging in', { status: 500 })
            } else return new Response('Error logging in', { status: 500 })
        }
    } catch (error) {
        console.error(error)
        return new Response('Error logging in', { status: 500 })
    }
}