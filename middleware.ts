import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export default async function middleware(req: any) {

    if (!req?.url) return NextResponse.next()

    const token = await getToken({ req })
    const isAuthenticated = !!token
    const requestHeaders = new Headers(req.headers)

    if (
        !isAuthenticated && req.nextUrl.pathname === "/"
    ) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    if (
        isAuthenticated && req.nextUrl.pathname.startsWith("/auth/")
    ) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
}
