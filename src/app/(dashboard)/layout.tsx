import Navigation from '@/components/Navigation'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='max-h-screen min-w-full min-h-screen bg-background'>
      <Navigation />
      <main className='flex flex-grow w-full'>{children}</main>
    </div>
  )
}
