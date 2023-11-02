const ProductQuantity = ({ quantity, setQuantity }) => {
  const handleChange = (e) => {
    let value = e.target.value;
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className='flex justify-center rounded-md'>
      <button
        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}
        className='text-xl border border-gray-300 rounded-l px-3.5'>
        -
      </button>
      <input
        className='w-8 text-center border-y border-gray-300 text-lg outline-none'
        type='text'
        value={quantity}
        onChange={handleChange}
      />
      <button
        onClick={() => setQuantity(quantity + 1)}
        className='text-xl border px-3.5 border-gray-300 rounded-r'>
        +
      </button>
    </div>
  );
};

export default ProductQuantity;
