"use client"

import Link from 'next/link'
import React, { FormEventHandler, useState } from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { BsApple, BsFacebook, BsMicrosoft } from 'react-icons/bs'
import { useRouter } from 'next/navigation'

export default function Login() {

    const [userInfo, setUserInfo] = useState({ email: "", password: "" })
    const router = useRouter()
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,
        }).then(res => { console.log(res); router.push('/') }).catch(err => console.log(err))
    }

    return (
        <>
            <main className='flex w-full h-full'>
                <div className='max-w-50% w-full h-screen py-12 flex flex-col gap-3 items-center justify-center bg-[#f5f5f6]'>
                    <h2 className='mt-2'>Great to see you again!</h2>
                    <h2 className='mb-2'>Log in to your account</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center min-w-[360px] md:min-w-[540px] gap-12 px-12'>
                        <input
                            value={userInfo.email}
                            onChange={({ target }) => {
                                setUserInfo({ ...userInfo, email: target.value })
                            }}
                            className='w-full cursor-pointer p-3 border-solid border border-gray text-base rounded-xl font-bold outline-0 hover:border-gray-dark'
                            type='email'
                            placeholder='Email'
                        />
                        <input
                            value={userInfo.password}
                            onChange={({ target }) => {
                                setUserInfo({ ...userInfo, password: target.value })
                            }}
                            className='w-full cursor-pointer p-3 border-solid border border-gray text-base rounded-xl font-bold outline-0 hover:border-gray-dark'
                            type='password'
                            placeholder='Password'
                        />
                        <input type='submit' value='LOG IN' className='w-full cursor-pointer flex justify-center items-center py-6 text-white font-bold border-blue rounded bg-blue' />
                    </form>
                    <div className='w-full flex flex-col items-center justify-center gap-4'>
                        <div>
                            Don't have an account?
                            <Link href='/auth/registration'>
                                <span className='py-4 text-orange-500 cursor-pointer font-semibold'> Create one here</span>
                            </Link>
                        </div>
                        <div>
                            Forgot your password?
                            <Link href='/auth/reset-password'>
                                <span className='py-4 text-orange-500 cursor-pointer font-semibold'> Reset it here</span>
                            </Link>
                        </div>
                        <div onClick={async () => {
                            signIn('google').then(response => console.log('Google sign-in response:', response))
                                .catch(error => console.error('Google sign-in error:', error))
                        }} className='flex items-center justify-center gap-1 bg-white border border-gray rounded-lg p-3 cursor-pointer hover:border-gray-dark'>
                            Sign in with Google
                            <FcGoogle size={30} />
                        </div>
                        <div onClick={() => { signIn('facebook') }} className='flex items-center justify-center gap-2 bg-white border border-gray rounded-lg p-3 cursor-pointer hover:border-gray-dark'>
                            Sign in with Facebook
                            <BsFacebook size={30} color="#3B5998"/>
                        </div>
                        <div onClick={() => { signIn('apple') }} className='flex items-center justify-center gap-2 bg-white border border-gray rounded-lg p-3 cursor-pointer hover:border-gray-dark'>
                            Sign in with Apple
                            <BsApple size={30} color="#555555"/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}