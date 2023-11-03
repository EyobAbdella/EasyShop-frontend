import React, { useContext, useState } from "react";
import MobileCart from "../components/MobileCartItems";
import CartItems from "../components/CartItems";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import toast from "react-hot-toast";
import Shipping from "../components/Shipping";
import { AuthContext } from "../context/AuthContext";
import { orderMutation } from "../service/orderService";
import CartItemSkeleton, {
  MobileCartItemSkeleton,
} from "../skeletons/CartItemSkeleton";

const Cart = () => {
  const { cartItems, isLoading, cartId, setOrder, totalPrice } =
    useContext(StoreContext);
  const { authTokens } = useContext(AuthContext);
  const totalItems = cartItems?.length;
  const navigate = useNavigate();
  const order = orderMutation(authTokens);
  const [address, setAddress] = useState({
    streetAddress: "",
    city: "",
    zipCode: "",
  });
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (Object.values(address).some((field) => field === "")) {
      toast.error(
        "Please complete the address fields before proceeding to checkout."
      );
      return;
    }

    if (authTokens) {
      const response = await order.mutateAsync({
        cart_id: cartId,
        street_address: address.streetAddress,
        city: address.city,
        zipcode: address.zipCode,
      });
      setOrder(response.data);
      localStorage.removeItem("cart_id");
      navigate("/checkout");
    } else {
      toast.error(
        "Checkout is available for logged-in users only. Please sign in to continue."
      );
      navigate("/login");
    }
  };

  if (totalItems === 0) {
    return (
      <div className='mt-5 mb-20  px-4'>
        <h1 className='pb-4 border-b-2 border-gray-800 text-3xl'>Cart</h1>
        <h1 className='text-lg mt-4 mb-10 pl-4'>
          Your cart is currently empty.
        </h1>
        <Link
          to='/shop'
          className='bg-indigo-900 py-3 px-10 text-white rounded text-lg'>
          Return to shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className='hidden sm:block'>
        <h1 className='text-black text-4xl ml-4 font-serif py-2 border-b-2 border-gray-900 w-fit mb-4'>
          Your Cart
        </h1>

        {isLoading ? (
          Array(4)
            .fill(0)
            .map((item, index) => <CartItemSkeleton key={index} />)
        ) : (
          <CartItems cartItems={cartItems} />
        )}
      </div>

      {isLoading ? (
        Array(4)
          .fill(0)
          .map((item, index) => <MobileCartItemSkeleton key={index} />)
      ) : (
        <MobileCart cartItems={cartItems} />
      )}
      <div className='grid grid-cols-1 custom:grid-cols-2 place-items-center mt-5 gap-y-5 mx-auto lg:px-10'>
        {!isLoading && (
          <>
            <Shipping address={address} setAddress={setAddress} />
            <div className='mb-auto w-full md:max-w-[600px] mx-auto'>
              <h1 className='text-lg pl-2'>Cart Totals</h1>
              <div className='p-3'>
                <section className='flex justify-between items-center border-b border-gray-200 mt-5'>
                  <p>Delivery</p>
                  <p>Free</p>
                </section>
                <section className='flex justify-between items-center border-b border-gray-200 mt-5'>
                  <p>Total</p>
                  <p>${totalPrice}</p>
                </section>
                <button
                  onClick={handleCheckout}
                  className='w-full py-3 bg-gray-900 hover:bg-gray-800 text-lg px-10 rounded text-slate-200 mt-5'>
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
