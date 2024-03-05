import useDesigner from '@/lib/hooks/useDesigner'
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { useState } from 'react'
import { ElementsType, FormElements } from './FormElements'
import { SidebarButtonElementDragOverlay } from './SidebarButtonElement'

const DragOverlayWrapper = () => {
  const { elements } = useDesigner()
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let node = <div>No drag overlay</div>

  const isSidebarButtonElement =
    draggedItem.data.current?.isDesignerButtonElement

  if (isSidebarButtonElement) {
    const type = draggedItem.data.current?.type as ElementsType
    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />
  }

  const isDesignerElement = draggedItem.data.current?.isDesignerElement

  if (isDesignerElement) {
    const elementId = draggedItem.data.current?.elementId
    const element = elements.find((element) => element.id === elementId)

    if (!element) node = <div>Element not found!</div>
    else {
      const DesignerElementComponenet =
        FormElements[element.type].designerComponent

      node = (
        <div className='flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer pointer-events-none'>
          <DesignerElementComponenet elementInstance={element} />
        </div>
      )
    }
  }
  return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper
