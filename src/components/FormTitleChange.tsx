'use client'

import { UpdateFormTitle } from '@/actions/form'
import { useState } from 'react'
import { toast } from './ui/use-toast'

const FormTitleChange = ({ id, name }: { id: number; name: string }) => {
  const [value, setValue] = useState(name || '')

  const updateTitle = async () => {
    if (value === name) return

    try {
      await UpdateFormTitle(id, value)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Cannot update title',
        variant: 'destructive',
      })
    }
  }

  return (
    <input
      type='text'
      name='name'
      id='name'
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      onBlur={() => updateTitle()}
      className='!outline-none !border-none focus:underline text-4xl font-bold mb-3 bg-transparent'
      placeholder='Form Name'
    />
  )
}

export default FormTitleChange
