"use client"

import axios from 'axios'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {

  const { data: session } = useSession()
  const [logins, setLogins] = useState<any>(undefined)

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  useEffect(() => {
    axios.get(`/api/logins?userId=${session?.id}`).then(res => setLogins(res.data.logins))
  }, [session])

  return (
    <>
      <title>Conta Layback</title>
      <div className="flex flex-col items-start justify-center my-6 mx-4 border-gray border rounded">
        <h5 className="border-t-gray border-solid py-[6px] px-4 bg-gray-light text-nav w-full border-b border-gray mr-6 text-[20px] font-[500]">Track your logins</h5>
        {logins && (
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-[20%]">ID</th>
                  <th className="w-[20%]">Product</th>
                  <th className="w-[20%]">Time</th>
                  <th className="w-[20%]">IP</th>
                  <th className="w-[20%]">Geolocation</th>
                </tr>
              </thead>
              <tbody>
                {logins.map((login: any) => (
                  <tr key={login.id}>
                    <td>{login.id}</td>
                    <td>{login.product}</td>
                    <td>{formatTimestamp(login.time)}</td>
                    <td>{login.ip}</td>
                    <td className="max-w-[500px]">{login.geolocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default Home