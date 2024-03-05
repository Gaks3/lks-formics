'use client'

import { DesignerContext } from '@/components/context/DesignerContext'
import { useContext } from 'react'

const useDesigner = () => {
  const context = useContext(DesignerContext)

  if (!context) throw new Error('Must be used within designer context')

  return context
}

export default useDesigner
