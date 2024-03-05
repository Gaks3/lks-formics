'use client'

import { useDndMonitor, useDroppable } from '@dnd-kit/core'
import DesignerSidebar from './DesignerSidebar'
import { ElementsType, FormElements } from './FormElements'
import { cn, idGenerator } from '@/lib/utils'
import useDesigner from '@/lib/hooks/useDesigner'
import DesignerElementWrapper from './DesignerElementWrapper'

const Designer = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner()

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  })

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event

      if (!active || !over) return

      const isDesignerButtonElement =
        active.data?.current?.isDesignerButtonElement
      const isDroppingOverDesignerDropArea =
        over?.data?.current?.isDesignerDropArea

      const droppingSidebarButtonOverDesignerDropArea =
        isDesignerButtonElement && isDroppingOverDesignerDropArea

      if (droppingSidebarButtonOverDesignerDropArea) {
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        )

        addElement(elements.length, newElement)
        return
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement
      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf

      const droppingSidebarButtonOverDesignerElement =
        isDesignerButtonElement && isDroppingOverDesignerElement

      if (droppingSidebarButtonOverDesignerElement) {
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        )

        const overId = over.data?.current?.elementId

        const overElementIndex = elements.findIndex((el) => el.id === overId)
        if (overElementIndex === -1) throw new Error('Element not found')

        let indexForNewElement = overElementIndex
        if (isDroppingOverDesignerElementBottomHalf)
          indexForNewElement = overElementIndex + 1

        addElement(indexForNewElement, newElement)
        return
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId
        const overId = over.data?.current?.elementId

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        )
        const overElementIndex = elements.findIndex((el) => el.id === overId)

        if (activeElementIndex === -1 || overElementIndex === -1)
          throw new Error('Element not found')

        const activeElement = { ...elements[activeElementIndex] }
        removeElement(activeId)

        let indexForNewElement = overElementIndex
        if (isDroppingOverDesignerElementBottomHalf)
          indexForNewElement = overElementIndex + 1

        addElement(indexForNewElement, activeElement)
      }
    },
  })

  return (
    <div className='flex flex-grow w-full'>
      <DesignerSidebar />
      <div
        className='w-full h-full p-5'
        onClick={() => {
          if (selectedElement) setSelectedElement(null)
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'min-w-[90%] max-w-[90%] m-auto h-full flex flex-col flex-grow items-center flex-1 overflow-y-auto rounded-xl',
            droppable.isOver && 'ring-2 ring-primary ring-inset',
            elements.length <= 0 ? 'justify-center' : 'justify-start'
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className='flex items-center justify-center flex-grow w-full text-2xl font-bold'>
              Drop Here
            </p>
          )}
          {elements.length > 0 && (
            <div className='flex flex-col w-full gap-2 p-4'>
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Designer
