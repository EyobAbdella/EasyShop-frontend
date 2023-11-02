import { FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { IoReturnDownBackOutline } from "react-icons/io5";
import ProductCard from "../components/ProductCard";
import { FaTruckFast } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../config";
import ProductSkeleton from "../skeletons/ProductSkeleton";
import ProductImage from "../assets/product-image.png";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/store/products/`);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const highestRated = data?.results?.sort((a, b) => b.rating - a.rating);
  const products = highestRated?.slice(0, 4);
  const secondProducts = highestRated?.slice(4, 8);

  return (
    <div className='sm:px-4 px-2'>
      <div className='gap-y-7 bg-[#fff] w-full h-full grid grid-cols-1 md:grid-cols-2 px-4 sm:px-10 md:py-10 place-content-center'>
        <div className='space-y-4 flex flex-col items-center md:items-start lg:mt-5'>
          <p>New In Town</p>
          <p className='text-xl sm:text-6xl font-serif'>
            The New All-Inclusive Collection
          </p>
          <p className='sm:text-xl'>
            Most thrilling range of products across Electronics, books,
            groceries, clothes and beauty. Experience the joy of diverse
            shopping under one roof.
          </p>
          <button className='flex gap-x-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded text-slate-200 bg-green-800 hover:bg-green-900'>
            <FaShoppingCart size={25} />
            <Link to='/shop'>SHOP NOW</Link>
          </button>
        </div>
        <img
          className='object-cover px-0.5 mix-blend-darken'
          src={ProductImage}
          alt=''
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-8 gap-x-2 xl:gap-x-10 font-serif py-4 px-10'>
        <p className=' xl:col-span-1 md:col-span-3 underline text-center xl:row-start-2 row-start-1'>
          WHY CHOOSE US
        </p>
        <div className='flex gap-x-4 px-1 sm:px-0 md:row-start-2'>
          <MdLocalShipping
            className='p-1.5 box-content bg-green-700 rounded-full text-slate-200'
            size={25}
          />
          <div className='w-fit md:w-56 space-y-1'>
            <p className=' text-2xl text-black'>Free Shipping</p>
            <p className=" font-['Open_Sans'] pl-0.5 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur blanditiis, vel adipisci ipsa ut perspiciatis
            </p>
          </div>
        </div>
        <div className='flex gap-x-4 px-1 sm:px-0 md:row-start-2'>
          <FaTruckFast
            className='p-1.5 box-content bg-green-700 rounded-full text-slate-200'
            size={25}
          />
          <div className='w-fit md:w-56 space-y-1'>
            <p className=' text-2xl text-black'>Fast Delivery</p>
            <p className=" font-['Open_Sans'] pl-0.5 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur blanditiis, vel adipisci ipsa ut perspiciatis
            </p>
          </div>
        </div>
        <div className='flex gap-x-4 px-1 sm:px-0 md:row-start-2'>
          <IoReturnDownBackOutline
            className='p-1.5 box-content bg-green-700 rounded-full text-slate-200'
            size={25}
          />
          <div className='w-fit md:w-56 space-y-1'>
            <p className=' text-2xl text-black'>Easy Return</p>
            <p className=" font-['Open_Sans'] pl-0.5 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur blanditiis, vel adipisci ipsa ut perspiciatis
            </p>
          </div>
        </div>
      </div>
      <div className='text-center py-9 font-serif'>
        <span className='text-gray-500'>shop</span>
        <h1 className='text-black text-4xl'>Best Selling Products</h1>
      </div>
      <div className='container flex flex-wrap items-start gap-x-3 gap-y-10 justify-center mx-auto'>
        {isLoading
          ? Array(4)
              .fill(0)
              .map((item, index) => <ProductSkeleton key={index} />)
          : secondProducts?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isBook={product.category.title === "Books"}
              />
            ))}
      </div>
      <div className='text-center py-9 font-serif'>
        <span className='text-gray-500 text-sm'>POPULAR PRODUCTS</span>
        <h1 className='text-black text-4xl'>Trending Products</h1>
      </div>
      <div className='container flex flex-wrap items-start gap-x-3 gap-y-10 justify-center mx-auto'>
        {isLoading
          ? Array(4)
              .fill(0)
              .map((item, index) => <ProductSkeleton key={index} />)
          : products?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isBook={product.category.title === "Books"}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
