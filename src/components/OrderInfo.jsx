import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const OrderInfo = () => {
  const { order } = useContext(StoreContext);

  return (
    <div className='space-y-4 w-full py-1 mx-auto sm:w-fit mb-4'>
      <h1 className='text-lg mx-auto w-fit font-bold'>Order Info</h1>
      <div className='flex items-center justify-evenly gap-x-5'>
        <div className='space-y-2 font-semibold font-serif'>
          <h1>Full Name:</h1>
          <h1>Email Address:</h1>
          <h1>Street Address:</h1>
          <h1>City /Town:</h1>
          <h1>Zip Code:</h1>
        </div>
        <div className='space-y-2'>
          <h1>
            {order?.customer.first_name} {order?.customer.last_name}
          </h1>
          <h1>{order?.customer.email}</h1>
          <h1>{order?.street_address}</h1>
          <h1>{order?.city}</h1>
          <h1>{order?.zipcode}</h1>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
