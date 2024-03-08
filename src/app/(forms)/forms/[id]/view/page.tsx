import { GetFormById } from '@/actions/form'
import { FormElementInstance } from '@/components/FormElements'
import FormSubmit from '@/components/FormSubmit'
import { notFound } from 'next/navigation'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const form = await GetFormById(Number(id))

  if (!form) return notFound()

  return (
    <FormSubmit
      content={form.content as FormElementInstance[]}
      formUrl={form.shareUrl}
      title={form.name}
      description={form.description}
      view
    />
  )
}

export default Page
