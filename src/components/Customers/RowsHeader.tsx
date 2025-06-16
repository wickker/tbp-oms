import { PropsWithChildren } from 'react'
import { cn } from '@/utils/functions'

const columnNames = [
  'Full Name',
  'Email',
  'Contact',
  'Subscription',
  'Created At',
  'Actions',
]

type ColumnNameProps = {
  className?: string
} & PropsWithChildren

const ColumnName = ({ children, className }: ColumnNameProps) => {
  return (
    <div
      className={cn(
        'flex h-[48px] items-center bg-neutral-200 p-3 font-semibold whitespace-pre-line',
        className
      )}
    >
      {children}
    </div>
  )
}

const RowsHeader = () => {
  return columnNames.map((columnName) => (
    <ColumnName key={columnName}>{columnName}</ColumnName>
  ))
}

export default RowsHeader
