import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { StoreContext } from "../context/StoreContext";

const ShoppingCart = () => {
  const { cartItems } = useContext(StoreContext);
  const totalItems = cartItems?.length;
  return (
    <div className='relative cursor-pointer'>
      <p className='rounded-full w-4 h-4 flex items-center justify-center bg-red-700 text-white text-xs absolute bottom-4 left-5'>
        {totalItems}
      </p>
      <FaShoppingCart size={25} />
    </div>
  );
};

export default ShoppingCart;
