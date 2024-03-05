import { CheckboxFieldFormElement } from './field/CheckboxField'
import { DateFieldFormElement } from './field/DateField'
import { NumberFieldFormElement } from './field/NumberField'
import { SelectFieldFormElement } from './field/SelectField'
import { TextAreaFormElement } from './field/TextAreaField'
import { TextFieldFormElement } from './field/TextField'

export type ElementsType =
  | 'TextField'
  | 'TitleField'
  | 'SubTitleField'
  | 'SeparatorField'
  | 'SpacerField'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'SelectField'
  | 'CheckboxField'

export type SubmitFunction = (key: string, value: string | string[]) => void

export type FormElement = {
  type: ElementsType
  construct: (id: string) => FormElementInstance
  designerButtonElement: {
    icon: React.ElementType
    label: string
  }
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>
  formComponent: React.FC<{
    elementInstance: FormElementInstance
    submitValue?: SubmitFunction
    isInvalid?: boolean
    defaultValue?: string | string[]
  }>
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
  validate: (
    formElement: FormElementInstance,
    currentValue: string | string[]
  ) => boolean
}

export type FormElementInstance = {
  id: string
  type: ElementsType
  extraAttributes?: Record<string, any>
}

type FormElementsType = {
  [key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  SelectField: SelectFieldFormElement,
  TextAreaField: TextAreaFormElement,
  CheckboxField: CheckboxFieldFormElement,
  NumberField: NumberFieldFormElement,
  DateField: DateFieldFormElement,
}
