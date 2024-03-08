'use client'

import { Button } from '@/components/ui/button'
import { Prisma } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowDownUp } from 'lucide-react'

export type Form = {
  id: number
  userId: string
  createdAt: Date
  published: boolean
  name: string
  description: string
  content: Prisma.JsonValue
  visits: number
  submission: number
  shareUrl: string
}

export const columns: ColumnDef<Form>[] = [
  {
    accessorKey: 'userId',
    header: 'User Id',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Name
        <ArrowDownUp size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Description
        <ArrowDownUp size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) => (row.original.published ? 'Published' : 'Draft'),
  },
  {
    accessorKey: 'visits',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Visits
        <ArrowDownUp size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'submission',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Submission
        <ArrowDownUp size={16} />
      </Button>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='flex gap-2'
      >
        Created At
        <ArrowDownUp size={16} />
      </Button>
    ),
    cell: ({ row }) => format(row.original.createdAt, 'yyyy-MM-d'),
  },
]
