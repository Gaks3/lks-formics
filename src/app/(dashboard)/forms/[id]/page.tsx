import { GetFormById, GetFormWithSubmissions } from '@/actions/form'
import FormDescChange from '@/components/FormDescChange'
import { ElementsType, FormElementInstance } from '@/components/FormElements'
import FormTitleChange from '@/components/FormTitleChange'
import StatsCards from '@/components/Stats/StatsCards'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { format, formatDistance } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const form = await GetFormById(Number(id))

  if (!form) return notFound()

  let submissionRate = 0

  if (form.visits > 0) {
    submissionRate = (form.submission / form.visits) * 100
  }

  return (
    <div className='container pt-8 mb-10'>
      <div className='flex flex-row justify-between gap-20 px-10 border-b'>
        <div className='flex flex-col flex-1'>
          <FormTitleChange id={form.id} name={form.name} />
          <FormDescChange id={form.id} desc={form.description} />
        </div>
        <div className='flex items-center gap-5'>
          <Button className='w-24' asChild>
            <Link href={'/forms/' + form?.id + '/edit'}>Edit</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem asChild>
                <Link href={'/submit/' + form?.shareUrl}>Visit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='!text-red-500'>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='mt-10 container'>
        <Suspense fallback={<StatsCards loading={true} />}>
          <StatsCards
            loading={false}
            data={{
              visits: form.visits,
              submissions: form.submission,
              submissionsRate: submissionRate,
            }}
          />
        </Suspense>
      </div>
      <div className='container mt-10'>
        <SubmissionsTable id={form.id} />
      </div>
    </div>
  )
}

type Row = { [key: string]: string } & {
  submittedAt: Date
}

async function SubmissionsTable({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id)

  if (!form) {
    throw new Error('Form not found')
  }

  const formElements = form.content as FormElementInstance[]

  const columns: {
    id: string
    label: string
    required: boolean
    type: ElementsType
    options?: string[]
  }[] = []

  formElements.forEach((element) => {
    switch (element.type) {
      case 'CheckboxField':
      case 'TextField':
      case 'SelectField':
      case 'DateField':
      case 'NumberField':
      case 'TextAreaField':
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
          options: element.extraAttributes?.options,
        })
        break
      default:
        break
    }
  })

  const rows: Row[] = []

  form.FormSubmissions.forEach((submission) => {
    const content = submission.content as {}
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    } as Row)
  })

  return (
    <>
      <h1 className='text-2xl font-bold my-4'>Submissions</h1>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
              <TableHead className='text-muted-foreground text-right'>
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className='text-muted-foreground text-right'>
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

function RowCell({
  type,
  value,
}: {
  type: ElementsType
  value: string | string[]
}) {
  let node: React.ReactNode = value

  switch (type) {
    case 'DateField':
      if (!value) break
      const date = new Date(value as string)
      node = <Badge variant={'outline'}>{format(date, 'dd/MM/yyyy')}</Badge>
      break
    case 'CheckboxField':
      if (typeof value === 'object')
        node = (
          <div className='flex flex-col gap-2'>
            {value.map((item, index) => {
              return (
                <div className='items-center flex space-x-2' key={index}>
                  <Checkbox checked disabled className='!opacity-100' />
                  <div className='grid gap-1.5 leading-none'>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {item}
                    </label>
                  </div>
                </div>
              )
            })}
          </div>
        )

      break
  }

  return <TableCell>{node}</TableCell>
}

export default Page
