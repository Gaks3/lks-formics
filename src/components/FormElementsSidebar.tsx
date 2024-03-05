import { FormElements } from './FormElements'
import SidebarButtonElement from './SidebarButtonElement'

const FormElementsSidebar = () => {
  return (
    <div>
      <p>Drag &apos;n&apos; drop elements</p>
      <div className='grid grid-cols-1 my-2 md:grid-cols-2 place-self-start gap-4'>
        <SidebarButtonElement formElement={FormElements.TextField} />
        <SidebarButtonElement formElement={FormElements.SelectField} />
        <SidebarButtonElement formElement={FormElements.TextAreaField} />
        <SidebarButtonElement formElement={FormElements.CheckboxField} />
        <SidebarButtonElement formElement={FormElements.NumberField} />
        <SidebarButtonElement formElement={FormElements.DateField} />
      </div>
    </div>
  )
}

export default FormElementsSidebar
