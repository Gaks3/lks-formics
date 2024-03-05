import { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const StatsCard = ({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string
  value: string
  helperText: string
  icon: ReactNode
  loading: boolean
  className?: string
}) => {
  return (
    <>
      {loading ? (
        <Skeleton className='bg-card min-h-[165px]' />
      ) : (
        <Card
          className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
        >
          <CardHeader className='flex flex-row items-center justify-between pb-4'>
            <CardTitle className='mt-1'>{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent className='pb-4'>
            <div className='pl-2 text-2xl font-bold'>{value}</div>
          </CardContent>
          <CardFooter>
            <p className='pt-1 text-xs text-primary'>{helperText}</p>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

export default StatsCard
