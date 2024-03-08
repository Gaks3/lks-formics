'use client'

import ActionFormTable from '@/components/ActionFormTable'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Prisma } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowDownUp, ChevronDown } from 'lucide-react'

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
    header: ({ table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='!ring-transparent w-full'>
            Status
            <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => table.getColumn('published')?.setFilterValue('')}
          >
            None
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => table.getColumn('published')?.setFilterValue(false)}
          >
            Draft
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => table.getColumn('published')?.setFilterValue(true)}
          >
            Published
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
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
  {
    id: 'actions',
    cell: ({ row }) => <ActionFormTable id={row.original.id} />,
    enableHiding: false,
  },
]
