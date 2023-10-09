"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import UserService from 'services/UserService'

const ConfirmPasswordLink = ({ params }: any) => {
  const [verified, setVerified] = useState(true)
  const router = useRouter()
  const token = params.token

  useEffect(() => {
    UserService.confirmAccount(token).then((res) => {
      if (res.status == 200)
        router.push('/auth/login')
      else {
        setVerified(false)
      }
    }).catch((e) => {
      setVerified(false)
    })
  }, [])

  return (
    <>
      <Head>
        <title>Account confirmation page</title>
        <meta name="description" content="Confirm your account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex w-full h-screen'>
        <div className='max-w-50% w-full flex flex-col gap-3 items-center justify-center bg-gradient-to-l from-blue'>
          <div className='flex flex-col items-center justify-center min-w-[640px] gap-12 p-12'>
            {verified &&
              <>
                <h3>Verifying...</h3>
              </>
            }
            {!verified &&
              <>
                <h3>There was an error confirming your account</h3>
                <Link href='/auth/registration'>
                  <button className='w-full cursor-pointer flex justify-center items-center py-6 text-white font-bold border-blue rounded bg-blue'>
                    Back to register
                  </button>
                </Link>
              </>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default ConfirmPasswordLink