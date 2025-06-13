import { AnimatePresence, motion } from 'motion/react'
import { IoInformationCircle } from 'react-icons/io5'
import { Button } from '@/components/commons'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const DashTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <IoInformationCircle className='h-4 w-4' />
        </TooltipTrigger>
        <TooltipContent>
          <p>Input token for tracking ID links to Dash to work.</p>
          <p>
            You will also need{' '}
            <a
              target='_blank'
              href='https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino?hl=en'
              className='hover:cursor-pointer hover:underline'
            >
              CORS Unblock Chrome extension
            </a>
            .
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

type OptionsHeaderProps = {
  status: string
  onStatusChange: (status: string) => void
  token: string
  onTokenChange: (token: string) => void
  isDisabled: boolean
  deliveryMethod: string
  onDeliveryMethodChange: (deliveryMethod: string) => void
  sortBy: string
  onSortByChange: (sortBy: string) => void
  searchPhrase: string
  onSearchPhraseChange: (searchPhrase: string) => void
  onRefresh: () => void
}

const OptionsHeader = ({
  status,
  onStatusChange,
  token,
  onTokenChange,
  isDisabled,
  deliveryMethod,
  onDeliveryMethodChange,
  sortBy,
  onSortByChange,
  searchPhrase,
  onSearchPhraseChange,
  onRefresh,
}: OptionsHeaderProps) => {
  const showTid = status !== 'unfulfilled'

  return (
    <div className='flex items-center justify-between pb-3'>
      <div className='flex items-center gap-x-2'>
        <div className='flex flex-col gap-y-1'>
          <label className='text-xs font-semibold text-neutral-500'>
            Sort By
          </label>
          <Select
            value={sortBy}
            onValueChange={onSortByChange}
            disabled={isDisabled}
          >
            <SelectTrigger className='w-[230px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='order_id_asc'>Order ID (Asc)</SelectItem>
              <SelectItem value='order_id_desc'>Order ID (Desc)</SelectItem>
              <SelectItem value='delivery_date_desc'>
                Delivery Date (Latest First)
              </SelectItem>
              <SelectItem value='delivery_date_asc'>
                Delivery Date (Oldest First)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-y-1'>
          <label className='text-xs font-semibold text-neutral-500'>
            Status
          </label>
          <Select
            value={status}
            onValueChange={onStatusChange}
            disabled={isDisabled}
          >
            <SelectTrigger className='w-[120px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='fulfilled'>Fulfilled</SelectItem>
              <SelectItem value='unfulfilled'>Unfulfilled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-y-1'>
          <label className='text-xs font-semibold text-neutral-500'>
            Delivery Method
          </label>
          <Select
            value={deliveryMethod}
            onValueChange={onDeliveryMethodChange}
            disabled={isDisabled}
          >
            <SelectTrigger className='w-[150px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='ninja_cold'>NV Cold Chain</SelectItem>
              <SelectItem value='self_pickup'>Self Pickup</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col gap-y-1'>
          <label className='text-xs font-semibold text-neutral-500'>
            Search
          </label>
          <Input
            placeholder='Input order ID, TID, customer name or email'
            type='text'
            value={searchPhrase}
            onChange={(e) => onSearchPhraseChange(e.target.value)}
            className='w-[350px] text-xs'
            disabled={isDisabled}
          />
        </div>

        <AnimatePresence>
          {showTid && (
            <motion.div
              className='flex flex-col gap-y-1'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <label className='flex items-center gap-x-1 text-xs font-semibold text-neutral-500'>
                Dash Bearer Token
                <DashTooltip />
              </label>
              <Input
                type='text'
                value={token}
                onChange={(e) => onTokenChange(e.target.value)}
                className='w-[250px] text-xs'
                disabled={isDisabled}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button size='sm' isLoading={isDisabled} onClick={onRefresh}>
        Refresh
      </Button>
    </div>
  )
}

export default OptionsHeader
