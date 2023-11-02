import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrderSkeleton() {
  return (
    <div className='sm:py-6 mx-auto sm:px-16 w-full sm:max-w-[850px] container rounded-md px-2'>
      <Skeleton className='w-full px-6 h-8' />
      <Skeleton className='w-40 h-7 mt-4' />
      <Skeleton className='w-44 h-7 mt-4' />
      <Skeleton className='w-40 h-5 mt-4' />
      <div className='flex justify-evenly mt-6'>
        <Skeleton className='w-48 h-48' />
        <Skeleton className='w-32 h-5 mt-10' />
      </div>
    </div>
  );
}
