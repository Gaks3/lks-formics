'use client'

import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { ClipboardList, Loader2 } from 'lucide-react'
import { FormSchema, FormSchemaType } from '@/schema/form'
import { CreateForm } from '@/actions/form'
import { toast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

const CreateFormButton = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })
  const router = useRouter()

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const formId = await CreateForm(values)

      if (formId) {
        toast({
          title: 'Success',
          description: 'Successfully create a form',
        })

        router.push(`/forms/${formId}`)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className='flex flex-col items-center justify-center min-h-[190px] h-full gap-4 border border-dashed group border-primary/20 hover:border-primary hover:cursor-pointer bg-primary/5 hover:bg-primary/20'
        >
          <ClipboardList className='w-8 h-8 text-muted-foreground group-hover:text-white' />
          <p className='text-lg font-semibold text-muted-foreground group-hover:text-white'>
            Create new form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
          <DialogDescription>
            Create form for collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} className='max-h-[245px]' />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            className='w-full'
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {!form.formState.isSubmitting ? (
              <>Submit</>
            ) : (
              <>
                <Loader2 className='animate-spin' /> Loading
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateFormButton
