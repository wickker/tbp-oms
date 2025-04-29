// import { RiLoader4Line } from 'react-icons/ri'
import { PropsWithChildren } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className='truncate bg-neutral-200 p-3 font-semibold whitespace-nowrap'>
      {children}
    </div>
  )
}

const Content = ({ children }: PropsWithChildren) => {
  return <div className='p-3 break-words'>{children}</div>
}

const Row = () => (
  <>
    <Content>3289</Content>
    <Content>3924809834923804</Content>
    <Content>Jeslyn Tan</Content>
    <Content>Apr 19, 2025</Content>
    <Content>SGD 9.00</Content>
    <Content>
      1x Gently Cooked Free Range Beef for Cats - Trial Packs - Beef
    </Content>
    <Content>{`FREETRIAL<3THEBONPET`}</Content>
    <Content>
      <Button>
        {/* <RiLoader4Line className='animate-spin' /> */}
        Fulfill Order
      </Button>
    </Content>

    <div className='col-span-full border-b border-neutral-200' />
  </>
)

const Main = () => {
  return (
    <div className='mx-auto flex h-[100dvh] max-w-6xl flex-col p-3'>
      <div className='flex gap-x-2 pb-3'>
        <button
          className={cn(
            'focus-visible-app bg-app-default inline-flex h-fit w-fit items-center justify-center gap-x-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs whitespace-nowrap hover:cursor-pointer hover:opacity-95 disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          Fulfilled
        </button>
        <button
          className={cn(
            'focus-visible-app bg-app-default inline-flex h-fit w-fit items-center justify-center gap-x-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs whitespace-nowrap hover:cursor-pointer hover:opacity-95 disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          Unfulfilled
        </button>
      </div>

      <div className='grid grid-cols-[100px_150px_150px_100px_100px_minmax(200px,1fr)_100px_150px] items-center text-sm'>
        <Header>Order ID</Header>
        <Header>Shopify ID</Header>
        <Header>Customer Name</Header>
        <Header>Created At</Header>
        <Header>Total</Header>
        <Header>Items</Header>
        <Header>Discounts</Header>
        <Header>Actions</Header>

        <div className='col-span-full border-b border-neutral-200' />
      </div>

      <div className='scrollbar grid grid-cols-[100px_150px_150px_100px_100px_minmax(200px,1fr)_100px_150px] items-center overflow-y-auto text-sm'>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  )
}

export default Main
