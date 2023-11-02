import { createContext, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { API_URL } from "../config";
import {
  addToCartMutation,
  createCartMutation,
  removeProductMutation,
  updateQuantityMutation,
} from "../service/cartService";
const initStore = {
  isLoading: null,
  cartId: null,
  order: null,
  setOrder: null,
  totalPrice: 0,
  cartItems: [],
  handleAddToCart: () => {},
  handleRemoveProduct: () => {},
  updateProductQuantity: () => {},
};

export const StoreContext = createContext(initStore);

export default function StoreProvider({ children }) {
  let cartId = localStorage.getItem("cart_id");
  const queryClient = useQueryClient();
  const [order, setOrder] = useState(null);

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: async () => {
      if (cartId) {
        const response = await axios.get(
          `${API_URL}/store/carts/${cartId}/items`
        );
        return response.data;
      }
      return [];
    },
  });

  const totalPrice = cartItems?.reduce(
    (accumulator, item) => accumulator + item?.total_price,
    0
  );
  const createCart = createCartMutation();
  const addToCart = addToCartMutation();
  const removeProduct = removeProductMutation();
  const updateQuantity = updateQuantityMutation();

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!cartId) {
      const response = await createCart.mutateAsync({});
      cartId = response.data.id;
    }
    addToCart
      .mutateAsync({
        productId,
        quantity,
        cartId,
      })
      .then((response) => {
        queryClient.setQueryData(["cart", cartId], (prevData) => {
          if (Array.isArray(prevData)) {
            const existingProductIndex = prevData.findIndex(
              (item) => item.product.id === response.data.product.id
            );

            if (existingProductIndex !== -1) {
              const updatedData = [...prevData];
              updatedData[existingProductIndex] = response.data;
              return updatedData;
            } else {
              return [...prevData, response.data];
            }
          }
          return [response.data];
        });

        queryClient.invalidateQueries(["cart", cartId]);
      });
  };

  const handleRemoveProduct = async (id) => {
    await removeProduct.mutateAsync({ cartId, id });

    queryClient.setQueryData(["cart", cartId], (prevData) => {
      if (prevData) {
        return prevData.filter((item) => item.id !== id);
      }
      return prevData;
    });
  };

  const updateProductQuantity = async (id, quantity) => {
    queryClient.setQueryData(["cart", cartId], (oldCartItems = []) =>
      oldCartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
    updateQuantity.mutateAsync({ cartId, id, quantity }).then(() => {
      queryClient.invalidateQueries(["cart", cartId]);
    });
  };

  return (
    <StoreContext.Provider
      value={{
        isLoading,
        cartId,
        cartItems,
        handleAddToCart,
        handleRemoveProduct,
        totalPrice,
        order,
        setOrder,
        updateProductQuantity,
      }}>
      {children}
    </StoreContext.Provider>
  );
}
