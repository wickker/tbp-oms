import { useLocation, useNavigate } from 'react-router-dom'
import { SignOutButton } from '@clerk/clerk-react'
import { Button } from '@/components/commons'
import { cn } from '@/utils/functions'
const navItems = [
  {
    label: 'OMS',
    path: '/',
  },
  {
    label: 'Customers',
    path: '/customers',
  },
]

const NavigationBar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className='mb-2 h-[60px] min-w-[1450px] bg-black'>
      <div className='mx-auto flex h-full w-full max-w-[1450px] items-center justify-between p-3 text-white'>
        <div className='flex items-center gap-10'>
          {navItems.map((item) => {
            const isSelected = location.pathname === item.path

            return (
              <button
                className='flex cursor-pointer flex-col items-center'
                key={item.label}
                onClick={() => navigate(item.path)}
              >
                <div className='flex items-center gap-x-1'>{item.label}</div>
                <div
                  className={cn(
                    'h-[2px] w-full max-w-0 rounded-full transition-all',
                    isSelected && 'max-w-full bg-white'
                  )}
                />
              </button>
            )
          })}
        </div>

        <SignOutButton>
          <Button size='sm' variant='secondary'>
            Sign Out
          </Button>
        </SignOutButton>
      </div>
    </div>
  )
}

export default NavigationBar
