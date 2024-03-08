'use client'

import LineChart from '@/app/(admin)/dashboard/Bar'
import { subDays } from 'date-fns'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { DatePickerWithRange } from './DatePickerRange'
import { GetMostUserFormByDate } from '@/actions/form'
import { toast } from './ui/use-toast'

const FormChart = ({ initialData }: { initialData: string | null }) => {
  const [data, setData] = useState<string | null>(initialData)
  const [date, setDate] = useState<DateRange | undefined>()

  const getData = async () => {
    try {
      const mostForm = await GetMostUserFormByDate(
        date?.from || subDays(new Date(), 5),
        date?.to || new Date()
      )

      setData(mostForm)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    getData()

    //eslint-disable-next-line
  }, [date])

  return (
    <>
      <LineChart data={data as string} />
      <DatePickerWithRange date={date} setDate={setDate} />
    </>
  )
}

export default FormChart
