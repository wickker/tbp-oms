import { useState } from 'react'
import { SignedIn } from '@clerk/clerk-react'
import * as Popover from '@radix-ui/react-popover'
import { FaWhatsapp } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import CustomersPage from '@/components/Customers'

const Customers = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  const handleOpen = () => setOpen(true)

  return (
    <SignedIn>
      <div className='min-h-[100dvh] min-w-max'>
        <div className='relative mx-auto flex max-w-[1450px] flex-col p-3'>
          <CustomersPage onOpenMessages={handleOpen} />

          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button className='fixed right-8 bottom-8 cursor-pointer rounded-full bg-green-500 p-2 text-white'>
                <FaWhatsapp className='h-6 w-6' />
              </button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content
                sideOffset={5}
                side='top'
                align='end'
                className='flex h-[500px] max-h-[var(--radix-popover-content-available-height)] w-[400px] flex-col rounded-lg bg-neutral-100 p-3 shadow-lg'
                onPointerDownOutside={(e) => e.preventDefault()}
              >
                <button
                  className='cursor-pointer self-end'
                  onClick={handleClose}
                >
                  <IoClose className='h-6 w-6' />
                </button>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </SignedIn>
  )
}

export default Customers
