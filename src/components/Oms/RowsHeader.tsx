import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

const columnNames = [
  'Order ID',
  'Shopify ID',
  'Customer Name',
  'Created At',
  'Total',
  'Items',
  'Discounts',
  'Delivery Date',
  'Contact',
  'Actions',
]

type ColumnNameProps = {
  className?: string
} & PropsWithChildren

const ColumnName = ({ children, className }: ColumnNameProps) => {
  return (
    <div
      className={cn(
        'truncate bg-neutral-200 p-3 text-sm font-semibold whitespace-nowrap',
        className
      )}
    >
      {children}
    </div>
  )
}

const RowsHeader = () => {
  return (
    <div className='grid h-[45px] grid-cols-[100px_120px_150px_100px_100px_minmax(200px,1fr)_120px_120px_120px_120px] items-center'>
      {columnNames.map((columnName, index) => (
        <ColumnName key={index}>{columnName}</ColumnName>
      ))}
    </div>
  )
}

export default RowsHeader
