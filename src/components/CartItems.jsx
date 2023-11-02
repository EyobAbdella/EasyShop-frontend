import { useContext } from "react";
import Count from "./Count";
import { StoreContext } from "../context/StoreContext";

const CartItems = ({ cartItems }) => {
  const { handleRemoveProduct } = useContext(StoreContext);
  return (
    <div className='px-4 lg:px-8'>
      <div className='flex justify-between items-center border-b border-gray-100 pb-0.5'>
        <p className='text-lg font-semibold w-2/5 text-center'>Product</p>
        <p className='text-lg font-semibold text-center'>price</p>
        <p className='text-lg font-semibold text-center'>Quantity</p>
        <p className='text-lg font-semibold text-center'>Subtotal</p>
      </div>
      {cartItems.map((item) => (
        <div
          key={item.id}
          className='flex py-2 justify-between items-center border-b border-gray-100'>
          <div className='w-2/5 grid custom:grid-cols-2 grid-cols-1 place-items-center '>
            <img
              className='w-32 h-32 object-contain'
              src={item.product.image}
              alt={item.product.title}
            />
            <p className='text-center text-lg'>{item.product.title}</p>
            <button
              onClick={() => handleRemoveProduct(item.id)}
              className='w-fit mx-auto mt-3 px-4 py-1.5 bg-sky-950 hover:bg-sky-900 text-slate-200 rounded'>
              Remove Product
            </button>
          </div>
          <p className='text-lg font-semibold'>${item.product.unit_price}</p>
          <Count id={item.id} quantity={item.quantity} />
          <p className='text-lg font-semibold'>${item.total_price}</p>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
