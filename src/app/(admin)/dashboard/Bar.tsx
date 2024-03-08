'use client'

import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { toast } from '@/components/ui/use-toast'
import { format, toDate } from 'date-fns'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const LineChart = ({ data }: { data: string }) => {
  const userForms: {
    createdAt: Date
    userId: string
    _count: number
  }[] = JSON.parse(data)

  const chart = {
    labels: userForms.map(({ createdAt }) =>
      format(toDate(createdAt), 'yyyy-MM-d')
    ),
    datasets: [
      {
        label: 'Most forms',
        data: userForms.map(({ _count }) => _count),
      },
    ],
  }

  return (
    <Suspense fallback={<Skeleton className='w-full h-[220px]' />}>
      <Line
        data={chart}
        options={{
          responsive: true,
          scales: {
            y: {
              ticks: {
                stepSize: 1,
              },
              beginAtZero: true,
            },
          },
          // plugins: {
          //   tooltip: {
          //     callbacks: {
          //       label: (tooltipItem) => {
          //         return userForms[tooltipItem.dataIndex].userId
          //       },
          //     },
          //   },
          // },
          onClick: (_, elements) => {
            const e = elements[0]

            navigator.clipboard.writeText(userForms[e.index].userId)
            toast({ title: 'User Id copied to clipboard' })
          },
        }}
        className='min-h-[200px]'
      />
    </Suspense>
  )
}

export default LineChart
