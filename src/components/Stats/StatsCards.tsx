import { GetFormStats } from '@/actions/form'
import { Captions, MousePointerClick, View } from 'lucide-react'
import StatsCard from './StatsCard'

export type StatsCardsProps = {
  data?: Awaited<ReturnType<typeof GetFormStats>>
  loading: boolean
}

const StatsCards = ({ data, loading }: StatsCardsProps) => {
  return (
    <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
      <StatsCard
        title='Total visits'
        icon={<View className='mt-0' />}
        helperText={'All time form visits'}
        value={data?.visits.toLocaleString() || '0'}
        loading={loading}
      />
      <StatsCard
        title='Total submissions'
        icon={<Captions />}
        helperText={'All time form submissions'}
        value={data?.submissions.toLocaleString() || '0'}
        loading={loading}
      />
      <StatsCard
        title='Submissions rate'
        icon={<MousePointerClick />}
        helperText={'Visits with submissions'}
        value={data?.submissionsRate.toLocaleString() + ' %' || '0'}
        loading={loading}
        className='md:col-span-2 lg:col-auto'
      />
    </div>
  )
}

export default StatsCards
