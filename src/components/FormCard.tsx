import type { Form } from '@prisma/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Badge } from './ui/badge'
import { formatDistance } from 'date-fns'
import Link from 'next/link'
import { Suspense } from 'react'
import FormCardImage from './FormCardImage'
import { Skeleton } from './ui/skeleton'

const FormCard = async ({ form }: { form: Form }) => {
  return (
    <Link
      href={`/forms/${form.id}`}
      className='transition-all duration-300 hover:shadow-2xl hover:shadow-input/50'
    >
      <Card>
        <div className='grid grid-rows-3'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              {form.name}
              {form.published ? (
                <Badge>Published</Badge>
              ) : (
                <Badge variant={'destructive'}>Draft</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {formatDistance(form.createdAt, new Date(), {
                addSuffix: true,
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className='text-sm truncate text-muted-foreground row-span-2'>
            <Suspense fallback={<Skeleton className='w-full h-full' />}>
              <div className='w-full h-full relative'>
                <FormCardImage
                  id={form.id}
                  url={form.shareUrl}
                  published={form.published}
                />
              </div>
            </Suspense>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

export default FormCard
