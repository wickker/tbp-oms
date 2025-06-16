import { useEffect, useRef } from 'react'
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
  isOrdersLoading: boolean
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
  isOrdersLoading,
  deliveryMethod,
  onDeliveryMethodChange,
  sortBy,
  onSortByChange,
  searchPhrase,
  onSearchPhraseChange,
  onRefresh,
}: OptionsHeaderProps) => {
  const isRefreshClickedRef = useRef(false)
  const showTid = status !== 'unfulfilled'

  const handleRefresh = () => {
    isRefreshClickedRef.current = true
    onRefresh()
  }

  useEffect(() => {
    if (!isOrdersLoading) isRefreshClickedRef.current = false
  }, [isOrdersLoading])

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
            disabled={isOrdersLoading}
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
            disabled={isOrdersLoading}
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
            disabled={isOrdersLoading}
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
            placeholder='Shopify order ID, TID, customer name or email'
            type='text'
            value={searchPhrase}
            onChange={(e) => onSearchPhraseChange(e.target.value)}
            className='w-[350px] text-xs'
            disabled={isOrdersLoading}
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
                disabled={isOrdersLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button
        size='sm'
        isLoading={isOrdersLoading && isRefreshClickedRef.current}
        onClick={handleRefresh}
        disabled={isOrdersLoading}
      >
        Refresh
      </Button>
    </div>
  )
}

export default OptionsHeader
