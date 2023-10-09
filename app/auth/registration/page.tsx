"use client"

import Head from 'next/head'
import type { NextPage } from 'next'
import { FormEventHandler, useState } from 'react'
import UserService from 'services/UserService'

const Registration: NextPage = () => {

  const [userInfo, setUserInfo] = useState({ email: '', password: '', telephone_number: '' })
  const [confirmationLink, setConfirmationLink] = useState<string | undefined>(undefined)
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (userInfo.email && userInfo.password && userInfo.telephone_number) {
      UserService.create(userInfo.email, userInfo.password, userInfo.telephone_number)
        .then(function (res) {
          console.log(res)
          if (res.status == 200)
            setConfirmationLink(res.data)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }

  return (
    <>
      <Head>
        <title>Registration page</title>
        <meta name="description" content="Register your account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex w-full h-screen'>
        <div className='max-w-50% w-full flex flex-col gap-3 items-center justify-center bg-gradient-to-l from-blue'>
          <h3>Register your account</h3>
          <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center min-w-[360px] md:min-w-[540px] gap-12 px-12'>
            {!confirmationLink && <>
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
                value={userInfo.telephone_number}
                onChange={({ target }) => {
                  setUserInfo({ ...userInfo, telephone_number: target.value })
                }}
                className='w-full cursor-pointer p-3 border-solid border border-gray text-base rounded-xl font-bold outline-0 hover:border-gray-dark'
                type='text'
                placeholder='Telephone number'
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
              <input type='submit' value='REGISTER' className='w-full cursor-pointer flex justify-center items-center py-6 text-white font-bold border-blue rounded bg-blue' />
            </>}
            {confirmationLink &&
              <p className='text-red-500 text-justify	'><strong>Success!</strong> We have sent a confirmation link to your account's registered email. Confirm your email in order to proceed.<br></br>As this is the dev environment, the link is the following: {confirmationLink}</p>
            }
          </form>
        </div>
      </main>
    </>
  )
}

export default Registration