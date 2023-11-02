import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function MobileCartItemSkeleton() {
  return (
    <div className='w-full h-[480px] space-y-4'>
      <div className='w-52 h-52 mx-auto'>
        <Skeleton className='w-52 h-52' />
      </div>
      <div className='w-full flex justify-between px-2'>
        <Skeleton className='w-28 h-6' />
        <Skeleton className='w-52 h-5' />
      </div>
      <div className='w-full flex justify-between px-2'>
        <Skeleton className='w-20 h-5' />
        <Skeleton className='w-24 h-5' />
      </div>
      <div className='w-full flex justify-between px-2'>
        <Skeleton className='w-28 h-5' />
        <Skeleton className='w-20 h-5' />
      </div>
      <div className='w-full flex justify-between px-2'>
        <Skeleton className='w-28 h-5' />
        <Skeleton className='w-24 h-5' />
      </div>
      <div className='w-52 h-52 mx-auto'>
        <Skeleton className='w-44 h-12 mx-auto' />
      </div>
    </div>
  );
}

export default function CartItemSkeleton() {
  return (
    <div className='px-16'>
      <div className='flex justify-between'>
        <Skeleton className='w-40 h-5' />
        <Skeleton className='w-40 h-5' />
        <Skeleton className='w-40 h-5' />
        <Skeleton className='w-40 h-5' />
      </div>
      <div className='flex justify-between mt-7'>
        <div>
          <Skeleton className='w-48 h-40' />
          <Skeleton className='w-40 h-8 mt-2' />
        </div>
        <div>
          <Skeleton className='w-40 h-5' />
          <Skeleton className='w-20 h-5' />
        </div>
        <Skeleton className='w-40 h-5' />
        <Skeleton className='w-40 h-5' />
      </div>
    </div>
  );
}
