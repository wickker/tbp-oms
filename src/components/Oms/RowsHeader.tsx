import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

const columnNames = [
  'Order ID',
  'Tracking ID',
  'Customer\nName',
  'Created',
  'Total',
  'Items',
  'Discounts',
  'Delivery\nDate',
  'Status',
  'Delivery\nMethod',
  'Actions',
]

type ColumnNameProps = {
  className?: string
} & PropsWithChildren

const ColumnName = ({ children, className }: ColumnNameProps) => {
  return (
    <div
      className={cn(
        'flex h-full items-center bg-neutral-200 p-3 text-sm font-semibold whitespace-pre-line',
        className
      )}
    >
      {children}
    </div>
  )
}

const RowsHeader = () => {
  return (
    <div className='grid h-[64px] w-full grid-cols-[90px_120px_150px_100px_100px_minmax(200px,1fr)_120px_100px_120px_120px_120px] items-center'>
      {columnNames.map((columnName, index) => (
        <ColumnName key={index}>{columnName}</ColumnName>
      ))}
      <div className='col-span-full border-b border-neutral-200' />
    </div>
  )
}

export default RowsHeader
