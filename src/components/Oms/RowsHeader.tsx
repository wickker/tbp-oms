import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

const columnNames = [
  'Order ID',
  'Tracking ID',
  'Customer\nDetails',
  'Total',
  'Items',
  'Discounts',
  'Delivery\nDate',
  'Status',
  'Delivery\nMethod',
  'Shipping\nDetails',
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

type RowsHeaderProps = {
  className?: string
}

const RowsHeader = ({ className }: RowsHeaderProps) => {
  return (
    <div className={cn('grid h-[64px] w-full items-center', className)}>
      {columnNames.map((columnName, index) => (
        <ColumnName key={index}>{columnName}</ColumnName>
      ))}
      <div className='col-span-full border-b border-neutral-200' />
    </div>
  )
}

export default RowsHeader
