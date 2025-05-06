import { SignOutButton } from '@clerk/clerk-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '../commons'

type OptionsHeaderProps = {
  status: string
  onSelectChange: (status: string) => void
  token: string
  onTokenChange: (token: string) => void
}

const OptionsHeader = ({
  status,
  onSelectChange,
  token,
  onTokenChange,
}: OptionsHeaderProps) => {
  return (
    <div className='flex items-center gap-x-2 pb-3'>
      <div className='flex flex-col gap-y-1'>
        <label className='text-xs font-semibold text-neutral-500'>Status</label>
        <Select value={status} onValueChange={onSelectChange}>
          <SelectTrigger className='w-[130px]'>
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
          Dash Bearer Token
        </label>
        <Input
          type='text'
          value={token}
          onChange={(e) => onTokenChange(e.target.value)}
          className='w-[250px] text-xs'
        />
      </div>

      <SignOutButton>
        <Button size='sm'>Sign Out</Button>
      </SignOutButton>
    </div>
  )
}

export default OptionsHeader
