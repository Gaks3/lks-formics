import { GetFormContentByUrl } from '@/actions/form'
import { FormElementInstance } from '@/components/FormElements'
import FormSubmit from '@/components/FormSubmit'
import { notFound } from 'next/navigation'

const Page = async ({
  params: { formUrl },
}: {
  params: { formUrl: string }
}) => {
  const form = await GetFormContentByUrl(formUrl)

  if (!form) return notFound()

  return (
    <FormSubmit
      content={form.content as FormElementInstance[]}
      formUrl={formUrl}
      title={form.name}
      description={form.description}
    />
  )
}

export default Page
