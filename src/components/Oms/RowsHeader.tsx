import { PropsWithChildren } from 'react'
import { cn } from '@/utils/functions'

const columnNames = [
  'Order\nID',
  'Tracking\nID',
  'Customer\nDetails',
  'Total',
  'Items',
  'Discounts',
  'Delivery\nDate',
  'Status',
  'Delivery\nMethod',
  'Shipping\nDetails',
  'Created\nAt',
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
  showTid: boolean
}

const RowsHeader = ({ className, showTid }: RowsHeaderProps) => {
  return (
    <div className={cn('grid h-[64px] w-full items-center', className)}>
      <ColumnName>{columnNames[0]}</ColumnName>

      {showTid && <ColumnName>{columnNames[1]}</ColumnName>}

      {columnNames.slice(2, 12).map((columnName, index) => (
        <ColumnName key={index}>{columnName}</ColumnName>
      ))}

      <div className='col-span-full border-b border-neutral-200' />
    </div>
  )
}

export default RowsHeader
