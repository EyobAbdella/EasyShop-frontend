const Shipping = ({ address, setAddress }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <div className='w-full space-y-3 md:max-w-[600px] px-1.5'>
      <h1 className='text-xl font-medium mx-auto pl-2'>Shipping Information</h1>
      <div className='p-1.5 sm:p-4 space-y-4'>
        <div>
          <label className='text-sm' htmlFor='streetAddress'>
            Street address
          </label>
          <input
            name='streetAddress'
            className='w-full outline-none focus:ring focus:ring-indigo-200 rounded py-2 px-1 border border-gray-400'
            type='text'
            value={address.streetAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='text-sm' htmlFor='city'>
            Town / City
          </label>
          <input
            name='city'
            id='city'
            className='w-full outline-none focus:ring focus:ring-indigo-200 rounded py-2 px-1 border border-gray-400'
            type='text'
            value={address.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className='text-sm' htmlFor='zipCode'>
            zipCode
          </label>
          <input
            id='zipCode'
            name='zipCode'
            className='w-full outline-none focus:ring focus:ring-indigo-200 rounded py-2 px-1 border border-gray-400'
            type='text'
            value={address.zipCode}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
