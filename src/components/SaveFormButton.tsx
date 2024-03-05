import { Loader2, Save } from 'lucide-react'
import { Button } from './ui/button'
import useDesigner from '@/lib/hooks/useDesigner'
import { useTransition } from 'react'
import { UpdateFormContent } from '@/actions/form'
import { toast } from './ui/use-toast'

const SaveFormButton = ({ id }: { id: number }) => {
  const { elements } = useDesigner()
  const [loading, startTransition] = useTransition()

  const updateContent = async () => {
    try {
      await UpdateFormContent(id, elements)

      toast({
        title: 'Success',
        description: 'Form has been saved',
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
    <Button
      variant={'ghost'}
      className='flex gap-3'
      disabled={loading}
      onClick={() => startTransition(updateContent)}
    >
      {!loading ? (
        <>
          <Save size={20} />
          Save
        </>
      ) : (
        <>
          <Loader2 size={20} className='animate-spin' />
          Loading
        </>
      )}
    </Button>
  )
}

export default SaveFormButton
