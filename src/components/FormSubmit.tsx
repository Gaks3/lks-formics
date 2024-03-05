'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { FormElementInstance, FormElements } from './FormElements'
import { toast } from './ui/use-toast'
import { SubmitForm } from '@/actions/form'
import { Button } from './ui/button'
import { Loader2, Send } from 'lucide-react'
import { Separator } from './ui/separator'

const FormSubmit = ({
  formUrl,
  title,
  description,
  content,
}: {
  formUrl: string
  title: string
  description: string
  content: FormElementInstance[]
}) => {
  const formValues = useRef<{ [key: string]: string | string[] }>({})
  const formErrors = useRef<{ [key: string]: boolean }>({})

  const [renderKey, setRenderKey] = useState(new Date().getTime())
  const [submitted, setSubmitted] = useState(false)

  const [pending, startTransition] = useTransition()

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || ''
      const valid = FormElements[field.type].validate(field, actualValue)

      if (!valid) {
        formErrors.current[field.id] = true
      }
    }

    if (Object.keys(formErrors.current).length > 0) return false

    return true
  }, [content])

  const submitValue = useCallback((key: string, value: string | string[]) => {
    formValues.current[key] = value
  }, [])

  const submitForm = async () => {
    formErrors.current = {}

    const validForm = validateForm()

    if (!validForm) {
      setRenderKey(new Date().getTime())

      toast({
        title: 'Error',
        description: 'Please check the form for errors',
        variant: 'destructive',
      })

      return
    }

    try {
      await SubmitForm(formUrl, formValues.current)

      setSubmitted(true)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  if (submitted) return <h1>Terimakasih</h1>

  return (
    <div className='flex justify-center w-full h-full p-8'>
      <div
        key={renderKey}
        className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full overflow-y-auto'
      >
        <div className='w-full border rounded-md border-border'>
          <div className='w-full h-3 bg-primary rounded-t-md' />
          <div className='p-8 space-y-3'>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <Separator />
            <p className='border-b border-border pb-1'>{description}</p>
          </div>
        </div>
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent

          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          )
        })}
        <Button
          className='mt-8'
          onClick={() => {
            startTransition(submitForm)
          }}
          disabled={pending}
        >
          {!pending && (
            <>
              <Send className='mr-2' size={20} />
              Submit
            </>
          )}
          {pending && <Loader2 className='animate-spin' />}
        </Button>
      </div>
    </div>
  )
}

export default FormSubmit
