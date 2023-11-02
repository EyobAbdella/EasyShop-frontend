import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCardDetail from "../components/ProductCardDetail";
import ProductReview from "../components/ProductReview";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import ProductDetailSkeleton from "../skeletons/ProductDetailSkeleton";
import { getReviews } from "../service/reviewService";

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: reviewsData, isLoading: reviewsLoading } = getReviews(slug);

  const { data: productData, isLoading: productLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/store/products/${slug}/`);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      {productLoading ? (
        <ProductDetailSkeleton />
      ) : (
        <ProductCardDetail product={productData} />
      )}
      {reviewsLoading ? (
        <div className='ml-5 sm:ml-20'>
          <Skeleton className='w-1/6 h-8 mt-10' />
          <Skeleton className='w-3/5 h-5 mt-5' />
        </div>
      ) : (
        <ProductReview reviews={reviewsData} />
      )}
    </div>
  );
};

export default ProductDetail;
