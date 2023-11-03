import { FaShoppingCart } from "react-icons/fa";
import { useContext, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const ProductCard = ({ product, isBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleAddToCart } = useContext(StoreContext);

  function truncateTitle(title) {
    if (title.length > 35) {
      return title.slice(0, 35) + " ...";
    }
    return title;
  }

  return (
    <div>
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className='rounded-md flex items-center justify-center relative w-48 h-60 sm:w-72 sm:h-[340px] bg-indigo-50'>
        <p className='hidden sm:flex z-40 absolute top-3 rounded-full bg-slate-5l0 bg-slate-50 left-2 px-2 py-0.5 shadow-md shadow-slate-300'>
          sale!
        </p>
        <p
          onClick={() => handleAddToCart(product.id)}
          className='absolute top-3 left-2 flex sm:hidden rounded-full box-content p-2 hover:p-2.5 z-40 cursor-pointer text-[#232323] bg-slate-50 shadow-lg shadow-slate-400'>
          <FaShoppingCart size={25} />
        </p>
        {isOpen && (
          <div
            onClick={() => handleAddToCart(product.id)}
            className='hidden z-40 absolute top-3 right-2 cursor-pointer sm:flex gap-x-1 items-center hover:px-1 sm:hover:px-2 duration-500'>
            <p className='bg-[#090909] h-7 py-1 text-slate-100 px-1.5 text-sm'>
              Add to cart
            </p>
            <p className='rounded-full box-content p-1.5 text-[#232323] bg-slate-50 shadow-lg shadow-slate-400'>
              <FaShoppingCart size={22} />
            </p>
          </div>
        )}
        <Link to={`/product/${product.slug}`}>
          <img
            className={`object-contain px-0.5 cursor-auto w-44 h-56 sm:w-[278px] sm:h-[330px] ${
              isBook ? "max-w-[192px] max-h-[240px]" : "mix-blend-darken"
            }`}
            src={product.image}
            alt=''
          />
        </Link>
      </div>
      <div className='space-y-1 mt-1.5'>
        <div className='flex'>
          {[...Array(product.rating)].map((_, index) => (
            <AiFillStar key={index} className=' text-yellow-500' size={25} />
          ))}
          {[...Array(5 - product.rating)].map((_, index) => (
            <AiOutlineStar key={index} size={25} />
          ))}
        </div>
        <h1 className='break-words w-48 sm:w-72'>
          {truncateTitle(product.title)}
        </h1>
        <div className=' space-x-2 font-semibold text-sm'>
          <span className=' line-through text-gray-400'>
            {parseFloat((product.unit_price * 1.2).toFixed(2))}
          </span>
          <span>${product.unit_price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
