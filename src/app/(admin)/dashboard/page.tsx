import { GetMostUserFormByDate } from '@/actions/form'
import FormChart from '@/components/FormChart'
import { subDays } from 'date-fns'

const Page = async () => {
  const initialFormCharts = await GetMostUserFormByDate(
    subDays(new Date(), 5),
    new Date()
  )

  return (
    <div className='h-full w-full flex flex-col items-center'>
      <h1>Dashboard</h1>
      <div className='w-1/2 h-full'>
        <FormChart initialData={initialFormCharts} />
      </div>
    </div>
  )
}

export default Page
