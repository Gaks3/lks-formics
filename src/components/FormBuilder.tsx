'use client'

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { Form } from '@prisma/client'
import { ClipboardList } from 'lucide-react'
import Link from 'next/link'
import SaveFormButton from './SaveFormButton'
import PublishFormButton from './PublishFormButton'
import { UserButton } from '@clerk/nextjs'
import Designer from './Designer'
import useDesigner from '@/lib/hooks/useDesigner'
import { useEffect, useState } from 'react'
import DragOverlayWrapper from './DragOverlayWrapper'
import { FormElementInstance } from './FormElements'

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements, setSelectedElement } = useDesigner()
  const [isReady, setIsReady] = useState(false)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    if (isReady) return

    setElements((form?.content as FormElementInstance[]) || [])
    setSelectedElement(null)

    const readyTimeout = setTimeout(() => setIsReady(true), 500)

    return () => clearTimeout(readyTimeout)
  }, [form, setElements, isReady, setSelectedElement])

  return (
    <DndContext sensors={sensors}>
      <div className='flex flex-col min-w-full min-h-screen bg-background'>
        <nav className='flex items-center justify-between min-w-full px-6 py-4 border-b border-border'>
          <div className='flex items-center gap-3'>
            <Link href={'/'}>
              <ClipboardList size={35} className='text-primary' />
            </Link>
            <Link href={'/forms/' + form.id}>
              <h1 className='text-lg font-semibold'>{form?.name}</h1>
            </Link>
          </div>
          <div className='flex items-center gap-5'>
            <SaveFormButton id={form.id} />
            <PublishFormButton id={form.id} published={form.published} />
            <UserButton afterSignOutUrl='/sign-in' />
          </div>
        </nav>
        <main className='flex flex-grow w-full'>
          <Designer />
        </main>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  )
}

export default FormBuilder
