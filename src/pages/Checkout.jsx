import { useContext } from "react";
import Stripe from "../components/Stripe";
import { StoreContext } from "../context/StoreContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from "react-hot-toast";
import OrderSummary from "../components/OrderSummary";
import OrderInfo from "../components/OrderInfo";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

const Checkout = () => {
  const { order } = useContext(StoreContext);
  const { authTokens } = useContext(AuthContext);
  const orderId = order?.id;
  const products = order?.items;
  const totalPrice = order?.total_price;
  if (!order)
    return (
      <div className='h-80 px-2 max-w-xl mx-auto'>
        <h1 className='text-lg pb-8 px-1 text-center'>
          Hello, welcome to our website. You have not selected any order yet. We
          have many amazing products and services for you. Please choose your
          order and check out. If you need any help, just let us know.
        </h1>
        <Link to='/order'>
          <h1 className='w-fit text-center mx-auto bg-indigo-900 hover:bg-indigo-800 py-3 px-10 text-white rounded text-lg'>
            Return to Order
          </h1>
        </Link>
      </div>
    );
  return (
    <>
      {order && (
        <div className='grid grid-cols-1 custom:grid-cols-2 place-items-center gap-y-2'>
          <div className='w-full max-w-[600px] mb-auto row-start-2 custom:row-start-1'>
            <OrderInfo />
            <div className='py-4 px-3 w-full max-w-[600px]'>
              <h1 className='text-xl font-medium mb-3 text-center'>Payment</h1>
              <div className='w-full sm:w-72 mx-auto'>
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalPrice?.toString(),
                          },
                          custom_id: orderId,
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    axios.post(
                      `${API_URL}/paypal-payment-approved/${orderId}`,
                      {},
                      {
                        headers: {
                          Authorization: `JWT ${authTokens.access}`,
                        },
                      }
                    );
                    return actions.order.capture().then(function (details) {
                      toast.success(
                        "Payment completed. Thank you, " +
                          details.payer.name.given_name
                      );

                      window.location.href = `/order/${orderId}`;
                    });
                  }}
                  onCancel={() =>
                    toast(
                      "You cancelled the payment. Try again by clicking the PayPal button",
                      {
                        duration: 6000,
                      }
                    )
                  }
                  onError={(err) => {
                    toast.error(
                      "There was an error processing your payment. If this error please contact support.",
                      {
                        duration: 6000,
                      }
                    );
                  }}
                />
              </div>
              <Stripe orderId={orderId} />
            </div>
          </div>

          <div className='space-y-2 w-full max-w-[600px] px-1.5 h-full mb-auto'>
            <h1 className='text-xl font-medium pl-2'>Order summary</h1>
            <div className='w-full sm:shadow-sm sm:shadow-slate-200 px-1.5 sm:px-2.5 py-3 space-y-3'>
              <div className='flex justify-between text-lg font-medium'>
                <p>Product</p>
                <p>Subtotal</p>
              </div>
              {products.map((item) => (
                <OrderSummary key={item.id} item={item} />
              ))}
              <div className='flex justify-between font-medium sm:border-b-0 border-b border-gray-100 pb-1.5 mt-1'>
                <p>Delivery</p>
                <p>Free</p>
              </div>
              <div className='flex justify-between font-medium sm:border-b-0 border-b border-gray-100 pb-1.5 mt-1'>
                <p>Total</p>
                <p>${totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
