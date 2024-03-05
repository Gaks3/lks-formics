'use client'

import { UpdateFormDesc } from '@/actions/form'
import { useState } from 'react'
import { toast } from './ui/use-toast'

const FormDescChange = ({ id, desc }: { id: number; desc: string }) => {
  const [value, setValue] = useState(desc || '')

  const updateDesc = async () => {
    try {
      await UpdateFormDesc(id, desc)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <input
      type='text'
      name='description'
      id='description'
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      onBlur={() => updateDesc()}
      className='!outline-none !border-none focus:underline mb-5 bg-transparent'
      placeholder='Description'
    />
  )
}

export default FormDescChange
