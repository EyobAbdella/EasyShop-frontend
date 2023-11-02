import { API_URL } from "../config";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const getOrder = (authTokens, orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/store/orders/`, {
        headers: {
          Authorization: `JWT ${authTokens.access}`,
        },
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const orderMutation = (authTokens) => {
  return useMutation((data) =>
    axios.post(`${API_URL}/store/orders/`, data, {
      headers: {
        Authorization: `JWT ${authTokens.access}`,
      },
    })
  );
};

export default function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${
    monthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
  return formattedDate;
}
