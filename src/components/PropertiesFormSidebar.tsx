import useDesigner from '@/lib/hooks/useDesigner'
import { FormElements } from './FormElements'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Separator } from './ui/separator'

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner()

  if (!selectedElement) return null

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent

  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>Element properties</h3>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => {
            setSelectedElement(null)
          }}
        >
          <X />
        </Button>
      </div>
      <Separator className='mb-4' />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  )
}

export default PropertiesFormSidebar
