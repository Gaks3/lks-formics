'use client'

import { ArrowDownWideNarrow, Plus, X } from 'lucide-react'
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '../FormElements'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import * as z from 'zod'
import useDesigner from '@/lib/hooks/useDesigner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Switch } from '../ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const type: ElementsType = 'SelectField'

const extraAttributes = {
  label: 'Select Field',
  helperText: 'Helper Text',
  required: false,
  placeHolder: 'Value Here...',
  options: [],
}

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  options: z.array(z.string()).default([]),
})

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

const DesignerComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) => {
  const element = elementInstance as CustomInstance

  const { label, required, placeHolder, helperText } = element.extraAttributes

  return (
    <div className='flex flex-col w-full gap-2'>
      <Label>
        {label}
        {required && '*'}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>
      )}
    </div>
  )
}

const FormComponent = ({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance
  submitValue?: SubmitFunction
  isInvalid?: boolean
  defaultValue?: string | string[]
}) => {
  const element = elementInstance as CustomInstance

  const [value, setValue] = useState((defaultValue as string) || '')
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  const { label, required, placeHolder, helperText, options } =
    element.extraAttributes

  return (
    <div className='flex flex-col w-full gap-2 border border-border p-4 rounded'>
      <Label className={cn('flex space-x-3', error && 'text-red-500')}>
        {label}
        {required && <span>*</span>}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value)
          if (!submitValue) return
          const valid = SelectFieldFormElement.validate(element, value)
          setError(!valid)
          submitValue(element.id, value)
        }}
      >
        <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <p
          className={cn(
            'text-muted-foreground text-[0.8rem]',
            error && 'text-red-500'
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

const PropertiesComponent = ({
  elementInstance,
}: {
  elementInstance: FormElementInstance
}) => {
  const element = elementInstance as CustomInstance

  const { updateElement, setSelectedElement } = useDesigner()

  const { label, required, placeHolder, helperText, options } =
    element.extraAttributes

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      required,
      placeHolder,
      helperText,
      options,
    },
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  const applyChanges = (values: propertiesFormSchemaType) => {
    const { label, required, placeHolder, helperText, options } = values

    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeHolder,
        required,
        options,
      },
    })

    setSelectedElement(null)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyChanges)} className='space-y-3'>
        <FormField
          control={form.control}
          name='label'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field. <br /> It will be displayed above the
                field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='placeHolder'
          render={({ field }) => (
            <FormItem>
              <FormLabel>PlaceHolder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>The placeholder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='helperText'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper text of the field. <br />
                It will be displayed below the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name='options'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between items-center'>
                <FormLabel>Options</FormLabel>
                <Button
                  variant={'outline'}
                  className='gap-2'
                  onClick={(e) => {
                    e.preventDefault() // avoid submit
                    form.setValue('options', field.value.concat('New option'))
                  }}
                >
                  <Plus />
                  Add
                </Button>
              </div>
              <div className='flex flex-col gap-2'>
                {form.watch('options').map((option, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between gap-1'
                  >
                    <Input
                      placeholder=''
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value
                        field.onChange(field.value)
                      }}
                    />
                    <Button
                      variant={'ghost'}
                      size={'icon'}
                      onClick={(e) => {
                        e.preventDefault()
                        const newOptions = [...field.value]
                        newOptions.splice(index, 1)
                        field.onChange(newOptions)
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
              <FormDescription>
                The helper text of the field. <br />
                It will be displayed below the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name='required'
          render={({ field }) => (
            <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm'>
              <div className='space-y-0.5'>
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  The helper text of the field. <br />
                  It will be displayed below the field.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <Button className='w-full' type='submit'>
          Save
        </Button>
      </form>
    </Form>
  )
}

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: ArrowDownWideNarrow,
    label: 'Select Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement, currentValue) => {
    const element = formElement as CustomInstance

    if (element.extraAttributes.required) return currentValue.length > 0

    return true
  },
}