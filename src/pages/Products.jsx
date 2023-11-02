import { useQuery } from "react-query";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { API_URL } from "../config";
import { useContext, useEffect, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import { StoreContext } from "../context/StoreContext";
import useDebounce from "../hooks/useDebounce";

const Products = ({ category }) => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");
  const debouncedSearch = useDebounce(searchQuery || "", 500);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: [category, page, debouncedSearch],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}/store/products/?category=${
          category === "Shop" || category === "Search" ? "" : category
        }&page=${page}&search=${debouncedSearch}`
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const totalPages = !isLoading && Math.ceil(data?.count / 8);

  const lastPage = () => setPage(totalPages);

  const firstPage = () => setPage(1);
  const pagesArray = Array(totalPages)
    .fill()
    .map((_, index) => index + 1);

  return (
    <div className='pt-4 sm:pt-14 pb-4'>
      <div className='pl-4 font-sans'>
        <p className='pb-4'>
          <Link to='/'>Home</Link> / {category}
        </p>
        <h1 className='pb-14 text-6xl text-black'>{category}</h1>
        {!isLoading && (
          <p className='pb-5'>
            Showing {(page - 1) * 9}–{Math.min(page * 8, data?.count)} of
            {data?.count} results
          </p>
        )}
      </div>
      <div className='container flex flex-wrap items-start gap-x-3 gap-y-10 justify-center mx-auto'>
        {isLoading
          ? Array(8)
              .fill(0)
              .map((item, index) => <ProductSkeleton key={index} />)
          : data.results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isBook={product.category.title === "Books"}
              />
            ))}
      </div>
      <div className='flex items-center gap-x-1 pl-5 mt-6'>
        <BsFillArrowLeftCircleFill
          className={`text-green-500 hover:text-green-600 ${
            isPreviousData || page === 1 ? "hidden" : ""
          }`}
          size={35}
          onClick={firstPage}
        />
        {pagesArray.map((pg) => (
          <button
            className='px-2.5 py-1 mx-0.5 border-2 border-green-500 rounded-full hover:bg-green-600 hover:text-white'
            key={pg}
            onClick={() => setPage(pg)}>
            {pg}
          </button>
        ))}
        <BsFillArrowRightCircleFill
          className={`text-green-500 hover:text-green-600 ${
            isPreviousData || page === totalPages ? "hidden" : ""
          }`}
          size={35}
          onClick={lastPage}
        />
      </div>
    </div>
  );
};

export default Products;
