const SkeletonRow = () => (
  <>
    <div className='flex h-[48px] items-center p-3'>
      <div className='h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    </div>
    <div className='flex h-[48px] items-center p-3'>
      <div className='h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    </div>
    <div className='flex h-[48px] items-center p-3'>
      <div className='h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    </div>
    <div className='flex h-[48px] items-center p-3'>
      <div className='h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    </div>
    <div className='flex h-[48px] items-center p-3'>
      <div className='h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    </div>
    <div className='flex h-[48px] items-center p-3'>
      <div className='h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    </div>
    <div className='col-span-full border-b border-neutral-200' />
  </>
)

const Skeleton = () => {
  return Array(5)
    .fill(null)
    .map((_, index) => <SkeletonRow key={index} />)
}

export default Skeleton
