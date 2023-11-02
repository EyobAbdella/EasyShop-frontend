import { Link, useLocation, useParams } from "react-router-dom";
import QueryString from "query-string";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import formatDate, { getOrder } from "../service/orderService";
import OrderSkeleton from "../skeletons/OrderSkeleton";
import { StoreContext } from "../context/StoreContext";

const Order = () => {
  const { authTokens } = useContext(AuthContext);
  const { setOrder } = useContext(StoreContext);
  const location = useLocation();
  const { id } = useParams();
  const { data, isLoading } = getOrder(authTokens, id);

  useEffect(() => {
    const values = QueryString.parse(location.search);

    if (values.success) {
      toast.success("Order placed! You will receive an email confirmation.");
    }

    if (values.canceled) {
      toast.error(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
    if (values.error) {
      toast.error(
        "Something went wrong when creating stripe checkout session."
      );
    }
  }, []);

  if (data?.length === 0)
    return (
      <div className='h-80 px-2 max-w-xl mx-auto'>
        <h1 className='text-lg pb-8 px-1'>
          Hello! It seems you haven’t placed an order yet. Browse through our
          wide range of products and find something you’ll love. If you need any
          assistance, feel free to ask. Happy shopping!
        </h1>
        <Link to='/shop'>
          <h1 className='w-fit text-center mx-auto bg-indigo-900 hover:bg-indigo-800 py-3 px-10 text-white rounded text-lg'>
            Return to shop
          </h1>
        </Link>
      </div>
    );

  return (
    <>
      {!isLoading
        ? data?.map((order) => (
            <div
              key={order.id}
              className='sm:py-6 mx-auto sm:px-16 w-full sm:max-w-[850px] container rounded-md px-1.5'>
              <div className='text-lg text-slate-100 font-semibold'>
                {order.is_paid ? (
                  order.is_delivered ? (
                    <h1 className='bg-green-900 px-1.5 py-1'>
                      Your order is delivered
                    </h1>
                  ) : (
                    <h1 className='bg-sky-900 px-1.5 py-1'>
                      Your order is processing
                    </h1>
                  )
                ) : (
                  <Link to='/checkout' onClick={() => setOrder(order)}>
                    <h1 className=' bg-yellow-800 px-1.5 py-1 w-full'>
                      You're almost done! Please complete the payment by
                      clicking here
                    </h1>
                  </Link>
                )}
              </div>

              <div className='items-end md:flex gap-x-16 space-y-2.5 font-serif sm:px-4 py-5 rounded mb-2'>
                <div className='border-b md:border-b-0 pb-0.5 md:border-r border-gray-400 border-dashed pr-2'>
                  <p>Date:</p>
                  <p className=' font-semibold'>
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div className='border-b md:border-b-0 pb-0.5 md:border-r border-gray-400 border-dashed pr-2'>
                  <p>Total:</p>
                  <p className=' font-semibold'>${order.total_price}</p>
                </div>
                <div className='border-b md:border-b-0 border-gray-400 border-dashed'>
                  <p>Payment method:</p>
                  <p className=' font-semibold'>{order.payment_method}</p>
                </div>
              </div>
              <div className='px-1 sm:px-4 pb-4 pt-4 md:pt-10 rounded-md container'>
                <h1 className='font-semibold text-lg mb-4'>Order detail</h1>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between px-3 border-t border-dashed border-gray-300 pt-2'>
                    <img
                      className='h-32 w-32 object-contain'
                      src={item.product?.image}
                      alt=''
                    />
                    <p className=''>
                      {item.product?.title}
                      <span className='px-3'>x</span>
                      {item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        : Array(4)
            .fill(0)
            .map((item, index) => <OrderSkeleton key={index} />)}
    </>
  );
};

export default Order;
