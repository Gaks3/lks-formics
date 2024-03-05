import { GetFormById } from '@/actions/form'
import FormBuilder from '@/components/FormBuilder'
import { notFound } from 'next/navigation'

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const form = await GetFormById(Number(id))

  if (!form) return notFound()

  return <FormBuilder form={form} />
}

export default Page
