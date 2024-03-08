import { GetFormContentByUrl } from '@/actions/form'
import { FormElementInstance } from '@/components/FormElements'
import FormSubmit from '@/components/FormSubmit'
import { notFound } from 'next/navigation'

const Page = async ({
  params: { formUrl },
}: {
  params: { formUrl: string }
}) => {
  let form

  try {
    form = await GetFormContentByUrl(formUrl)
  } catch (error) {
    return notFound()
  }

  if (!form || !form.published) return notFound()

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
