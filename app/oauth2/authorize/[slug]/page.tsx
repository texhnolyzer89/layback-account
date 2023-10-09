"use client"

import React, { FormEventHandler, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function Login() {

    const { data: session } = useSession()
    const [userInfo, setUserInfo] = useState({ email: "", password: "" })
    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        if (session)
            axios.get(`/api/oauth2/authorize?token=${params.slug}`).then(res => {
                if (res.status === 200) {
                    const redirectUrl = res.data
                    router.push(redirectUrl)
                }
            }).catch(err => console.log(err))
    }, [params, session])

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        if (params) {
            axios.post("/api/oauth2/authorize", {
                email: userInfo.email,
                password: userInfo.password,
                jwt: params.slug,
                redirect: false,
            }).then(res => {
                if (res.status === 200) {
                    const redirectUrl = res.data
                    router.push(redirectUrl)
                }
            }).catch(err => console.log(err))
        }
    }

    return (
        <>
            <main className='flex w-full h-full'>
                <div className='max-w-50% w-full h-screen py-12 flex flex-col gap-3 items-center justify-center bg-[#f5f5f6]'>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center min-w-[400px] md:min-w-[400px] gap-4 px-12'>
                        <input
                            value={userInfo.email}
                            onChange={({ target }) => {
                                setUserInfo({ ...userInfo, email: target.value })
                            }}
                            className='w-full cursor-pointer p-3 border-solid border border-gray text-base rounded-lg font-bold outline-0 hover:border-gray-dark'
                            type='email'
                            placeholder='Email'
                        />
                        <input
                            value={userInfo.password}
                            onChange={({ target }) => {
                                setUserInfo({ ...userInfo, password: target.value })
                            }}
                            className='w-full cursor-pointer p-3 border-solid border border-gray text-base rounded-lg font-bold outline-0 hover:border-gray-dark'
                            type='password'
                            placeholder='Password'
                        />
                        <button type="submit" className="flex items-center px-4 py-2 space-x-2 bg-black text-white hover:bg-blue-600 rounded-md">
                            <img src="/assets/layback-logo.png" className="w-5 h-5" />
                            <span>Login with Layback</span>
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}