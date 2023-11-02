import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div>
      <Skeleton className='w-48 h-60 sm:w-72 sm:h-[340px]' />
      <Skeleton className='h-5 w-40' />
      <Skeleton className='w-full sm:w-5/6' />
      <Skeleton className='w-40' />
    </div>
  );
};

export default ProductSkeleton;
