import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProductDetailSkeleton = () => {
  return (
    <div className='px-4 sm:px-20 flex-col flex sm:flex-row items-center sm:items-start w-full'>
      <Skeleton className='w-80 h-[300px] sm:h-[450px] sm:w-[450px]' />
      <div className='mt-3 ml-5 sm:ml-20 w-full'>
        <Skeleton className='w-5/6 h-8 mt-5' />
        <Skeleton className='w-1/3 h-8 mt-5' />
        <Skeleton className='w-4/5 h-7 mt-5' />
        <Skeleton className='w-3/4 h-8 mt-5' />
        <Skeleton className='w-3/5 h-8 mt-5' />
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
