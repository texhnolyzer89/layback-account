import Link from 'next/link'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import classNames from 'classnames'
import { signOut, useSession } from 'next-auth/react'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

interface NavbarProps {
    dummy: boolean,
}

function Navbar({ dummy }: NavbarProps) {

    const router = useRouter()
    const { data: session } = useSession()

    return (
        <>
            <div className={classNames({
                "fixed z-[1000]": !dummy,
                "flex justify-between bg-nav w-full items-center": true,
            })}>
                <div className="flex gap-4 items-center justify-center px-6 py-[13px]">
                    <ul className="flex gap-4 items-center justify-center ml-2">
                        {!session ?
                            <li className="flex items-center justify-center gap-2 text-[16px] text-nav-element hover:text-nav-element-hover">
                                <Link href='/auth/login'>Login</Link>
                                <FiLogIn />
                            </li> :
                            <li
                                onClick={() => {
                                    signOut()
                                }}
                                className='flex items-center justify-center gap-2 text-[16px] text-nav-element hover:text-nav-element-hover'>
                                Logout
                                <FiLogOut />
                            </li>}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar