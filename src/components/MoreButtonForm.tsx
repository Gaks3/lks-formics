'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { DeleteFormById } from '@/actions/form'
import { toast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  answer: z.literal('Delete it'),
})

const MoreButtonForm = ({
  shareUrl,
  published,
  id,
}: {
  shareUrl: string
  published: boolean
  id: number
}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async () => {
    try {
      await DeleteFormById(id)
    } catch (error) {
      return toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }

    router.push('/')
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem asChild>
            <span className={!published ? 'cursor-not-allowed' : ''}>
              <Link
                href={'/submit/' + shareUrl}
                className={`w-full h-full ${
                  !published ? 'pointer-events-none' : ''
                }`}
              >
                Visit
              </Link>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/forms/${id}/view`}>Preview</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='!text-red-500'>
            <DialogTrigger>Delete</DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Form</DialogTitle>
          <DialogDescription>
            Are you sure to delete this form?
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='answer'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type &quot;Delete it&quot;</FormLabel>
                  <FormControl>
                    <Input placeholder='...' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant={'ghost'} onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MoreButtonForm
