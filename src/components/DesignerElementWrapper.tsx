'use client'

import useDesigner from '@/lib/hooks/useDesigner'
import { FormElementInstance, FormElements } from './FormElements'
import { useState } from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const DesignerElementWrapper = ({
  element,
}: {
  element: FormElementInstance
}) => {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner()

  const [mouseIsOver, setMouseIsOver] = useState(false)

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  })

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  })

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  })

  if (draggable.isDragging) return null

  const DesignerElement = FormElements[element.type].designerComponent

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className='relative min-h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset'
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className='absolute w-full h-1/2 rounded-t-md'
      />
      <div
        ref={bottomHalf.setNodeRef}
        className='absolute bottom-0 w-full h-1/2 rounded-b-md'
      />
      {mouseIsOver && (
        <>
          <div className='absolute right-0 h-full'>
            <Button
              className='flex justify-center h-full border rounded-md rounded-l-none !bg-red-500'
              variant={'outline'}
              onClick={(e) => {
                e.stopPropagation()
                removeElement(element.id)
              }}
            >
              <Trash2 size={24} />
            </Button>
          </div>
          <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-pulse'>
            <p className='text-sm text-muted-foreground'>
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className='absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none' />
      )}
      <div
        className={cn(
          'flex w-full max-h-min min-h-[120px] items-center rounded-md bg-accent/40 p-4 pointer-events-none opacity-100',
          mouseIsOver && 'opacity-30'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className='absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none' />
      )}
    </div>
  )
}

export default DesignerElementWrapper
