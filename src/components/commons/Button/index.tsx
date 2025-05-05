import { PropsWithChildren, ComponentProps } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { RiLoader4Line } from 'react-icons/ri'
import { Button as ShadcnButton, buttonVariants } from '@/components/ui/button'

interface ButtonProps
  extends PropsWithChildren,
    ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}
const Button = ({ isLoading, children, ...props }: ButtonProps) => {
  return (
    <ShadcnButton {...props}>
      {isLoading && <RiLoader4Line className='animate-spin' />}
      {children}
    </ShadcnButton>
  )
}

export default Button
