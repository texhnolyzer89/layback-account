"use client"

import { useState, FormEventHandler } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'

const ResetPassword: NextPage = () => {

  const [resetLink, setResetLink] = useState<string | undefined>(undefined)
  const [email, setEmail] = useState<string | undefined>(undefined)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (email)
      {/*getPasswordResetLink(email).then((res) => {
        if (res.status == 200)
          setResetLink(res.data)
      }).catch((e) => {
        console.log(e)
      })*/}
  }

  return (
    <>
      <Head>
        <title>Verification page</title>
        <meta name="description" content="Verify email page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex w-full h-screen'>
        <div className='max-w-[50%] w-full hidden lg:block bg-cover bg-no-repeat bg-[url("/assets/blue_pattern.jpg")] shadow-xl shadow-gray'>
        </div>
        <div className='max-w-[50%] w-full flex flex-col gap-3 items-center justify-center bg-gradient-to-l from-blue'>
          <img src="/assets/padlock-svgrepo-com.svg" height="150px" width="150px" />
          <h3 className="mt-6">Reset your password</h3>
          {!resetLink && <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center min-w-[360px] md:min-w-[540px] gap-12 px-12'>
            <input
              value={email}
              onChange={({ target }) => {
                setEmail(target.value)
              }}
              className='w-full cursor-pointer p-3 border-solid border border-gray text-base rounded-xl font-bold outline-0 hover:border-gray-dark'
              type='email'
              placeholder='Email'
            />
            <input type='submit' value='RESET PASSWORD' className='w-full cursor-pointer flex justify-center items-center py-6 text-white font-bold border-blue rounded bg-blue' />

          </form>}
          {resetLink &&
            <p className='text-red-500 text-justify	max-w-[90%] break-words'><strong>Success!</strong> We have sent a password reset link to your account's registered email.<br></br>As this is the development environment, here is the link: {resetLink}</p>
          }
        </div>
      </main>
    </>
  )
}

export default ResetPassword