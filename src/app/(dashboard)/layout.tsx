import Logo from '@/components/Logo'
import { UserButton } from '@clerk/nextjs'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='max-h-screen min-w-full min-h-screen bg-background'>
      <nav className='flex items-center justify-between min-w-full px-6 py-4 border-b border-border'>
        <Logo />
        <div className='flex items-center gap-5'>
          <UserButton afterSignOutUrl='/sign-in' />
        </div>
      </nav>
      <main className='flex flex-grow w-full'>{children}</main>
    </div>
  )
}
