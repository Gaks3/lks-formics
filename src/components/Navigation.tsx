'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import Logo from './Logo'
import Link from 'next/link'

const Navigation = () => {
  const user = useUser()

  return (
    <nav className='flex items-center justify-between min-w-full px-6 py-4 border-b border-border'>
      <Logo />
      <div className='flex items-center gap-5'>
        <Link href={'/'} className='text-sm'>
          Home
        </Link>
        {user.user?.publicMetadata.role === 'admin' && (
          <Link href={'/dashboard'} className='text-sm'>
            Dashboard
          </Link>
        )}
        <UserButton afterSignOutUrl='/sign-in' />
      </div>
    </nav>
  )
}

export default Navigation
