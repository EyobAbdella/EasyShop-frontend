import { useContext } from "react";
import Count from "./Count";
import { StoreContext } from "../context/StoreContext";

const MobileCartItems = ({ cartItems }) => {
  const { handleRemoveProduct } = useContext(StoreContext);
  return (
    <div className='flex flex-col justify-center sm:hidden px-2 gap-y-8 text-black'>
      <h1 className='text-2xl text-black pb-2 border-b border-double border-black'>
        Your Cart
      </h1>
      {cartItems.map((item) => (
        <div key={item.id} className='flex flex-col justify-center'>
          <img
            className='w-52 h-52 mx-auto object-contain'
            src={item.product.image}
            alt={item.product.title}
          />
          <div className='flex items-center justify-between border-t border-gray-100 py-1.5'>
            <p className='mr-2'>Product:</p>
            <p>{item.product.title}</p>
          </div>
          <div className='flex items-center justify-between border-y border-gray-100 py-1.5'>
            <p>Price:</p>
            <p>${item.product.unit_price}</p>
          </div>
          <div className='flex items-center justify-between border-b border-gray-100 py-1.5'>
            <p>Quantity:</p>
            <Count id={item.id} quantity={item.quantity} />
          </div>
          <div className='flex items-center justify-between border-b border-gray-100 py-1.5'>
            <p>Subtotal:</p>
            <p>${item.total_price}</p>
          </div>
          <button
            onClick={() => handleRemoveProduct(item.id)}
            className='w-fit mx-auto mt-4 px-4 py-2.5 bg-sky-950 hover:bg-sky-900 text-slate-200 rounded'>
            Remove Product
          </button>
        </div>
      ))}
    </div>
  );
};

export default MobileCartItems;
