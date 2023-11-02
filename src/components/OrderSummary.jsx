const OrderSummary = ({ item }) => {
  return (
    <div className='flex justify-between items-center border-b border-gray-200 pb-2'>
      <div className='flex items-center gap-x-2 font-medium'>
        <img
          className='h-24 w-24 object-contain'
          src={item.product?.image}
          alt='product image'
        />
        <p className='w-1/2'>{item.product?.title}</p>
        <span className='ml-2 font-medium text-lg'>
          <span className='mr-1'>x</span>
          {item?.quantity}
        </span>
      </div>
      <p>${item.product?.unit_price}</p>
    </div>
  );
};

export default OrderSummary;
