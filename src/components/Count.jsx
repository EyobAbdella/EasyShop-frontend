import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import useDebounce from "../hooks/useDebounce";

const Count = (props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const debouncedQuantity = useDebounce(quantity, 500);
  const { updateProductQuantity } = useContext(StoreContext);

  useEffect(() => {
    if (debouncedQuantity && shouldUpdate) {
      updateProductQuantity(props.id, debouncedQuantity);
      setShouldUpdate(false);
    }
  }, [debouncedQuantity]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
      setShouldUpdate(true);
    }
  };

  const handleClick = (newQuantity) => {
    setQuantity(newQuantity);
    setShouldUpdate(true);
  };

  return (
    <div className='flex justify-center rounded-md'>
      <button
        onClick={() => handleClick(quantity > 1 ? quantity - 1 : quantity)}
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
        onClick={() => handleClick(quantity + 1)}
        className='text-xl border px-3.5 border-gray-300 rounded-r'>
        +
      </button>
    </div>
  );
};

export default Count;
