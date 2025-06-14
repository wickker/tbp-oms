import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
  UpdateOrderForm,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '@/@types/orders'
import { Button } from '@/components/commons'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useOrder from '@/hooks/queries/useOrder'
import { DeliveryMethod } from '@/utils/enums'

type EditOrderModalProps = {
  orderId: number
  deliveryDate: string
  deliveryMethod: string
}

const EditOrderModal = ({
  orderId,
  deliveryDate,
  deliveryMethod: dm,
}: EditOrderModalProps) => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const dd = DateTime.fromFormat(deliveryDate, 'd MMM yyyy').toFormat(
    'yyyy-MM-dd'
  )
  const defaultValues: UpdateOrderForm = {
    delivery_date: dd,
    delivery_method: dm,
  }
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty },
  } = useForm<UpdateOrderForm>({
    defaultValues,
  })
  const { useUpdateOrderMutation } = useOrder()
  const updateOrder = useUpdateOrderMutation(handleUpdateSuccess)

  function handleUpdateSuccess(
    data: UpdateOrderResponse,
    variables: UpdateOrderRequest
  ) {
    const { delivery_date, delivery_method } = variables
    queryClient.setQueryData(['orders'], (old: GetOrdersResponse) => {
      return {
        ...old,
        orders: old.orders.map((order) =>
          order.order_id === variables.order_id
            ? ({
                ...order,
                delivery_date: delivery_date
                  ? `${delivery_date}T00:00:00`
                  : order.delivery_date,
                pickup_date: data.updated_fields.pickup_date.new_value
                  ? `${data.updated_fields.pickup_date.new_value}T00:00:00`
                  : order.pickup_date,
                delivery_method: delivery_method || order.delivery_method,
              } satisfies Order)
            : order
        ),
      }
    })
    setOpen(false)
    reset({
      delivery_date: delivery_date || dd,
      delivery_method: delivery_method || dm,
    })
  }

  const handleCancel = () => {
    setOpen(false)
    reset(defaultValues)
  }

  const onSubmit = (data: UpdateOrderForm) => {
    const request: UpdateOrderRequest = {
      order_id: orderId,
      delivery_date: data.delivery_date || undefined,
      delivery_method: data.delivery_method,
    }
    updateOrder.mutate(request)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className='mb-2 block cursor-pointer text-blue-500'
        >
          <FaRegEdit className='h-6 w-6' />
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
                Edit Order
              </DialogTitle>

              <form className='flex flex-col gap-y-4'>
                <div className='flex items-center gap-x-2'>
                  <label className='text-sm font-bold'>Delivery date:</label>
                  <Input
                    type='date'
                    {...register('delivery_date')}
                    className='focus-visible:border-input w-fit outline-none focus-visible:ring-0'
                  />
                </div>

                <div className='flex items-center gap-x-2'>
                  <label className='text-sm font-bold'>Delivery method:</label>
                  <Controller
                    control={control}
                    name='delivery_method'
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={DeliveryMethod.NV_COLD_CHAIN}>
                            NV COLD CHAIN
                          </SelectItem>
                          <SelectItem value={DeliveryMethod.SELF_COLLECTION}>
                            SELF PICKUP
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </form>

              <div className='mt-10 flex items-center justify-between'>
                <Button variant='secondary' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  isLoading={updateOrder.isPending}
                  disabled={updateOrder.isPending || !isDirty}
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

export default EditOrderModal
