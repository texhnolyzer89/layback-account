"use client"

import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Navbar from '../components/Navbar'
import 'devextreme/dist/css/dx.light.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <html>
                <body>
                        <SessionProvider refetchInterval={5 * 60}>
                            <Navbar dummy={false} />
                            <Navbar dummy={true} />
                            {children}
                        </SessionProvider >
                </body>
            </html>
        </>
    )
}
