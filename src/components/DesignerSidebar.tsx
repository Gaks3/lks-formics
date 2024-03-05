import useDesigner from '@/lib/hooks/useDesigner'
import FormElementsSidebar from './FormElementsSidebar'
import PropertiesFormSidebar from './PropertiesFormSidebar'

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner()

  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col max-h-[100vh] gap-2 border-r border-border p-4 sticky top-0 overflow-y-auto'>
      {!selectedElement ? <FormElementsSidebar /> : <PropertiesFormSidebar />}
    </aside>
  )
}

export default DesignerSidebar
