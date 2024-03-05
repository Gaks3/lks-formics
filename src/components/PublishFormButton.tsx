import { UpdateStatusForm } from '@/actions/form'
import { toast } from './ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const StatusFormButton = ({
  id,
  published,
}: {
  id: number
  published: boolean
}) => {
  console.log(published ? 'Publish' : 'Draft')
  const updateStatus = async (value: boolean) => {
    try {
      await UpdateStatusForm(id, value)

      toast({
        title: 'Success',
        description: `Update form status to ${value ? 'published' : 'draft'}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    }
  }

  return (
    <Select
      onValueChange={(value) => updateStatus(value === 'true' ? true : false)}
      defaultValue={published ? 'true' : 'false'}
    >
      <SelectTrigger className='bg-primary text-primary-foreground min-w-38'>
        <SelectValue placeholder='Status' />
      </SelectTrigger>
      <SelectContent align='end'>
        <SelectItem value='true'>Published</SelectItem>
        <SelectItem value='false'>Draft</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default StatusFormButton
