import { ClipboardList } from 'lucide-react'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href={'/'} className='flex items-center gap-2'>
      <ClipboardList size={35} className='text-primary' />
      <div className='text-2xl w-52 font-extrabold text-transparent bg-[linear-gradient(to_right,theme(colors.green.500),theme(colors.emerald.400),theme(colors.green.600),theme(colors.green.500))] bg-clip-text bg-[length:200%_auto] animate-gradient'>
        Formics
      </div>
    </Link>
  )
}

export default Logo
