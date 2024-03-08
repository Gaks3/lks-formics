import { currentUser } from '@clerk/nextjs'
import { type ClassValue, clsx } from 'clsx'
import { notFound } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const idGenerator = (): string => {
  return Math.floor(Math.random() * 1001).toString()
}

export const getDates = (startDate: Date, endDate: Date) => {
  const dates = []
  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

export const OnlyAdmin = async () => {
  const user = await currentUser()

  if (user?.publicMetadata.role !== 'admin') return notFound()
}
