import { useContext, useState } from "react";
import ProductQuantity from "./ProductQuantity";
import { StoreContext } from "../context/StoreContext";

const ProductCardDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useContext(StoreContext);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 px-3.5 sm:px-5 lg:px-10 container mx-auto'>
      <img
        className='object-contain h-[500px] mix-blend-darken w-5/6 mx-auto'
        src={product.image}
        alt={product.title}
      />
      <div className='flex flex-col gap-y-2 sm:mt-10'>
        <h1 className='text-3xl text-black font-semibold'>{product.title}</h1>
        <h1 className='text-2xl text-black pl-1'>${product.unit_price}</h1>
        <p className='pl-2'>{product.description}</p>
        <p className='text-lg'>
          <span className='text-xl text-black'>Category:</span>
          {product.category.title}
        </p>
        <div className='flex gap-x-7 items-center'>
          <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
          <button
            onClick={() => handleAddToCart(product.id, quantity)}
            className='px-5 py-1.5 hover:bg-indigo-800 bg-indigo-700 rounded text-slate-50'>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDetail;
