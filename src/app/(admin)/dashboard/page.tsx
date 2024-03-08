import { GetAllFormCount, GetMostUserFormByDate } from '@/actions/form'
import FormChart from '@/components/FormChart'
import StatsCard from '@/components/Stats/StatsCard'
import { clerkClient } from '@clerk/nextjs'
import { subDays } from 'date-fns'
import { NotebookText, Users } from 'lucide-react'
import Link from 'next/link'

const Page = async () => {
  const initialFormCharts = await GetMostUserFormByDate(
    subDays(new Date(), 5),
    new Date()
  )

  const allFormCount = await GetAllFormCount()
  const users = await clerkClient.users.getCount()

  return (
    <div className='h-full flex flex-col items-center container py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full md:px-10'>
        <Link href={'/dashboard/form'}>
          <StatsCard
            title='All Forms'
            helperText='All Form has be created'
            value={allFormCount.toString()}
            icon={<NotebookText />}
            loading={false}
          />
        </Link>
        <StatsCard
          title='All Users'
          helperText='All User sign up'
          value={users.toString()}
          icon={<Users />}
          loading={false}
        />
      </div>
      <div className='w-10/12 h-full mt-8'>
        <FormChart initialData={initialFormCharts} />
      </div>
    </div>
  )
}

export default Page
