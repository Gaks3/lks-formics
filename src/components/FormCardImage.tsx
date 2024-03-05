import { ss } from '@/actions/image'
import { existsSync } from 'fs'
import Image from 'next/image'

const FormCardImage = async ({
  published,
  id,
  url,
}: {
  published: boolean
  id: number
  url: string
}) => {
  if (published) {
    const exist = existsSync(`public/${id}.png`)

    if (!exist)
      await ss(`${process.env.NEXT_PUBLIC_BASE_URL}/submit/${url}`, id)
  }

  return (
    <>
      {published ? (
        <Image
          src={`/${id}.png`}
          alt='Preview'
          fill
          className='object-contain'
        />
      ) : (
        <Image
          src={`/not-published.png`}
          alt='Not Published'
          fill
          className='dark:opacity-60 object-contain'
        />
      )}
    </>
  )
}

export default FormCardImage
