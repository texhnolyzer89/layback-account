"use client"

import { useRouter } from 'next/router'
import { useState, FormEventHandler } from 'react'
import Head from 'next/head'
import UserService from 'services/UserService'

const ResetPasswordLink = () => {

    const router = useRouter()
    const { token } = router.query
    const [newPassword, setNewPassword] = useState<string | undefined>(undefined)
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false)

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        if (newPassword)
            UserService.resetPassword(token as string, newPassword).then((res) => {
                if (res.status == 200) {
                    //router.push('/auth/login')
                    setPasswordChanged(true)
                }
                else {
                    setPasswordChanged(false)
                }
            }).catch((e) => {
                console.log(e)
            })
    }

    return (
        <>
            <Head>
                <title>Reset Password page</title>
                <meta name="description" content="Reset password" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='flex w-full h-screen'>
                <div className='max-w-50% w-full hidden lg:block bg-cover bg-no-repeat bg-[url("/assets/blue_pattern.jpg")] shadow-xl shadow-gray'>
                </div>
                <div className='max-w-50% w-full flex flex-col gap-3 items-center justify-center bg-gradient-to-l from-blue'>
                    <h1 className='text-[40px]'>Conta Layback</h1>
                    {!passwordChanged && <div className='flex flex-col items-center justify-center min-w-[640px] gap-12 p-12'>
                        <h2>Enter your new password</h2>
                        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center min-w-[540px] gap-12 px-12'>
                            <input
                                value={newPassword}
                                onChange={({ target }) => {
                                    setNewPassword(target.value)
                                }}
                                className='w-full cursor-pointer p-3 border-solid border border-gray text-base rounded-xl font-bold outline-0 hover:border-gray-dark'
                                type='password'
                                placeholder='Password'
                            />
                            <input type='submit' value='Reset Password' className='w-full cursor-pointer flex justify-center items-center py-6 text-white font-bold border-blue rounded bg-blue' />
                        </form>
                    </div>}
                    {passwordChanged && <p>Password successfully changed! Proceed to login.</p>}
                </div>
            </main >
        </>
    )
}

export default ResetPasswordLink