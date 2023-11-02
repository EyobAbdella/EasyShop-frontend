import axios from "axios";
import { useMutation } from "react-query";
import { API_URL } from "../config";

export const createCartMutation = () => {
  return useMutation(() => axios.post(`${API_URL}/store/carts/`, {}), {
    onSuccess: (cart) => {
      localStorage.setItem("cart_id", cart.data.id);
    },
  });
};

export const addToCartMutation = () => {
  return useMutation((data) => {
    return axios.post(`${API_URL}/store/carts/${data.cartId}/items/`, {
      product_id: data.productId,
      quantity: data.quantity,
    });
  });
};

export const removeProductMutation = () => {
  return useMutation((data) => {
    axios.delete(`${API_URL}/store/carts/${data.cartId}/items/${data.id}`);
  });
};

export const updateQuantityMutation = () => {
  return useMutation((data) =>
    axios.patch(`${API_URL}/store/carts/${data.cartId}/items/${data.id}/`, {
      quantity: data.quantity,
    })
  );
};
