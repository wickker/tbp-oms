import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { AnimatePresence, motion } from 'motion/react'
import { FaRegEdit } from 'react-icons/fa'
import {
  GetOrdersResponse,
  Order,
  UpdateDeliveryDateRequest,
} from '@/@types/orders'
import { Button } from '@/components/commons'
import { Input } from '@/components/ui/input'
import useOrder from '@/hooks/queries/useOrder'

type EditDeliveryDateModalProps = {
  orderId: number
  deliveryDate: string
}

const EditDeliveryDateModal = ({
  orderId,
  deliveryDate,
}: EditDeliveryDateModalProps) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const dd = DateTime.fromFormat(deliveryDate, 'd MMM yyyy').toFormat(
    'yyyy-MM-dd'
  )
  const [date, setDate] = useState(dd)
  const { useUpdateDeliveryDateMutation } = useOrder()
  const updateDeliveryDate = useUpdateDeliveryDateMutation(handleUpdateSuccess)

  function handleUpdateSuccess(_: null, variables: UpdateDeliveryDateRequest) {
    queryClient.setQueryData(['orders'], (old: GetOrdersResponse) => {
      return {
        ...old,
        orders: old.orders.map((order) =>
          order.order_id === variables.order_id
            ? ({
                ...order,
                delivery_date: `${variables.delivery_date}T00:00:00`,
              } satisfies Order)
            : order
        ),
      }
    })
    setDate(variables.delivery_date)
    setOpen(false)
  }

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value)

  const handleCancel = () => {
    setDate(dd)
    setOpen(false)
  }

  const handleSubmit = () => {
    const parsedDate = date.trim()
    if (!parsedDate) {
      toast.error('Please enter a valid date')
      return
    }

    updateDeliveryDate.mutate({
      order_id: orderId,
      delivery_date: parsedDate,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className='block cursor-pointer text-blue-500'
        >
          <FaRegEdit className='h-4 w-4' />
        </button>
      </DialogTrigger>

      <DialogPortal>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DialogOverlay className='fixed inset-0 bg-black opacity-70' />
            <DialogContent
              className='fixed top-[50%] left-[50%] grid max-h-[85dvh] w-[90dvw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] grid-rows-[auto_1fr_auto] rounded-lg bg-white p-4'
              aria-describedby={undefined}
            >
              <DialogTitle className='mb-6 text-2xl font-bold'>
                Edit Delivery Date
              </DialogTitle>

              <form className='flex items-center gap-x-2'>
                <label className='text-sm font-bold'>Delivery date:</label>
                <Input
                  type='date'
                  value={date}
                  onChange={handleDateChange}
                  className='w-fit'
                />
              </form>

              <div className='mt-10 flex items-center justify-between'>
                <Button variant='secondary' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  isLoading={updateDeliveryDate.isPending}
                >
                  Submit
                </Button>
              </div>
            </DialogContent>
          </motion.div>
        </AnimatePresence>
      </DialogPortal>
    </Dialog>
  )
}

export default EditDeliveryDateModal
