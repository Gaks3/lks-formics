import { GetAllForms } from '@/actions/form'
import { DataTable } from './data-table'
import { columns } from './columns'
import { OnlyAdmin } from '@/lib/utils'

const Page = async () => {
  await OnlyAdmin()

  const forms = await GetAllForms()

  return (
    <div className='container py-8'>
      <DataTable columns={columns} data={forms} />
    </div>
  )
}

export default Page
