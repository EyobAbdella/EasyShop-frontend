import { API_URL } from "../config";
const Stripe = ({ orderId }) => {
  return (
    <form
      className='mx-auto w-full sm:w-72'
      action={`${API_URL}/create-checkout-session/${orderId}`}
      method='POST'>
      <button className='w-full sm:w-fit h-11 sm:h-fit sm:text-base text-lg px-24 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded'>
        Pay with card
      </button>
    </form>
  );
};

export default Stripe;
