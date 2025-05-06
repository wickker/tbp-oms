const SkeletonRow = () => (
  <>
    <div className='m-3 h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    <div className='m-3 h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    <div className='m-3 h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    <div className='m-3 h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    <div className='flex w-full flex-col gap-y-2 p-3'>
      <div className='h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
      <div className='h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
      <div className='h-4 w-[60%] animate-pulse rounded-full bg-neutral-200' />
    </div>
    <div className='m-3 h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    <div className='m-3 h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    <div className='m-3 h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    <div className='m-3 h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    <div className='flex w-full flex-col gap-y-2 p-3'>
      <div className='h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
      <div className='h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
      <div className='h-4 w-[60%] animate-pulse rounded-full bg-neutral-200' />
      <div className='h-4 w-[50%] animate-pulse rounded-full bg-neutral-200' />
    </div>
    <div className='m-3 h-4 w-[80%] animate-pulse rounded-full bg-neutral-200' />
    <div className='col-span-full border-b border-neutral-200' />
  </>
)

const Skeleton = () => {
  return Array(8)
    .fill(null)
    .map((_, index) => <SkeletonRow key={index} />)
}

export default Skeleton
