import { PropsWithChildren } from 'react'
import { motion } from 'motion/react'
import { Customer } from '@/@types/customers'
import { Button } from '@/components/commons'
import { cn } from '@/utils/functions'

type ContentProps = {
  className?: string
} & PropsWithChildren

const Content = ({ children, className }: ContentProps) => {
  return (
    <div
      className={cn(
        'flex items-center p-3 break-all whitespace-pre-line',
        className
      )}
    >
      {children}
    </div>
  )
}

type RowProps = {
  customer: Customer
  onOpenMessages: () => void
}

const Row = ({ customer, onOpenMessages }: RowProps) => {
  return (
    <>
      <Content>
        {customer.first_name || ''} {customer.last_name || ''}
      </Content>

      <Content>{customer.email || ''}</Content>

      <Content>{customer.contact || ''}</Content>

      <Content>{JSON.stringify(customer.subscription) || ''}</Content>

      <Content>{customer.created_at || ''}</Content>

      <Content>
        <Button size='sm' variant='outline' onClick={onOpenMessages}>
          View Messages
        </Button>
      </Content>

      <motion.div
        className='col-span-full border-b border-neutral-200'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </>
  )
}

export default Row
