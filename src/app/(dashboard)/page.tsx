import CreateFormButton from '@/components/CreateFormButton'
import CardStatsWrapper from '@/components/Stats/CardStatsWrapper'
import StatsCards from '@/components/Stats/StatsCards'
import { Suspense } from 'react'
import { GetFormsByUser } from '@/actions/form'
import FormCard from '@/components/FormCard'

const Page = async () => {
  const form = await GetFormsByUser()

  return (
    <div className='container pt-8'>
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <h1 className='mb-5 text-2xl font-bold mt-14'>Your Forms</h1>
      <div className='grid grid-cols-1 gap-6 mb-20 auto-rows-fr md:grid-cols-2 lg:grid-cols-4'>
        <CreateFormButton />
        {form.map((data, index) => (
          <FormCard form={data} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Page
