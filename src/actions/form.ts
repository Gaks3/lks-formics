'use server'

import { currentUser } from '@clerk/nextjs'
import prisma from '@/lib/prisma'
import { FormSchema, FormSchemaType } from '@/schema/form'
import { FormElementInstance } from '@/components/FormElements'
import { getDates } from '@/lib/utils'

class UserNotFoundErr extends Error {}

export const GetFormStats = async () => {
  const user = await currentUser()
  if (!user) throw new UserNotFoundErr()

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submission: true,
    },
  })

  const visits = stats._sum.visits || 0
  const submissions = stats._sum.submission || 0
  let submissionsRate = 0

  if (visits > 0) submissionsRate = (submissions / visits) * 100

  return { visits, submissions, submissionsRate }
}

export const CreateForm = async (data: FormSchemaType) => {
  const user = await currentUser()
  if (!user) throw new UserNotFoundErr()

  const validate = FormSchema.safeParse(data)
  if (!validate.success) throw new Error('Form not valid')

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: validate.data.name,
      description: validate.data.description,
    },
  })

  if (!form) throw new Error('Something went wrong')

  return form.id
}

export const GetFormsByUser = async () => {
  const user = await currentUser()
  if (!user) throw new UserNotFoundErr()

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const GetFormById = async (id: number) => {
  const user = await currentUser()
  if (!user) throw new UserNotFoundErr()

  return await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
  })
}

export const UpdateFormContent = async (
  id: number,
  content: FormElementInstance[]
) => {
  const user = await currentUser()
  if (!user) throw new UserNotFoundErr()

  return await prisma.form.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      content,
    },
  })
}

export const UpdateStatusForm = async (id: number, status: boolean) => {
  const user = await currentUser()
  if (!user) throw new UserNotFoundErr()

  return await prisma.form.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      published: status,
    },
  })
}

export const SubmitForm = async (
  shareUrl: string,
  content: { [key: string]: string | string[] }
) => {
  return await prisma.form.update({
    data: {
      submission: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareUrl,
      published: true,
    },
  })
}

export async function GetFormContentByUrl(shareUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
      name: true,
      description: true,
    },
    where: {
      shareUrl,
      published: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  })
}

export async function UpdateFormTitle(id: number, name: string) {
  const user = await currentUser()
  if (!user) throw new UserNotFoundErr()

  return await prisma.form.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      name,
    },
    select: {
      id: true,
    },
  })
}

export async function UpdateFormDesc(id: number, description: string) {
  const user = await currentUser()
  if (!user) throw new UserNotFoundErr()

  return await prisma.form.update({
    where: {
      id,
    },
    data: {
      description,
    },
  })
}

export async function GetFormWithSubmissions(id: number) {
  const user = await currentUser()
  if (!user) throw new UserNotFoundErr()

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissions: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
}

export async function GetMostUserFormByDate(startDate: Date, endDate: Date) {
  const forms = await prisma.form.groupBy({
    by: ['userId', 'createdAt'],
    _count: true,
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  if (!forms || forms.length <= 0) return null

  const dateRange = getDates(startDate, endDate)

  const data = dateRange.map((date: Date) => {
    const exist = forms.filter(
      ({ createdAt }) => createdAt.getDate() === date.getDate()
    )

    if (exist.length == 0) return { _count: 0, createdAt: date }

    if (exist.length > 1) {
      console.log(exist)
      return exist.reduce((a, b) => (a._count > b._count ? a : b))
    }

    return { ...exist[0] }
  })

  return JSON.stringify(data)
}
