import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "../config";

export const getReviews = (slug) => {
  return useQuery({
    queryKey: ["reviews", slug],
    queryFn: async () => {
      const response = await axios.get(
        `${API_URL}/store/products/${slug}/reviews/`
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const postMutation = (authTokens, slug) => {
  return useMutation((data) =>
    axios.post(`${API_URL}/store/products/${slug}/reviews/`, data, {
      headers: {
        Authorization: `JWT ${authTokens.access}`,
      },
    })
  );
};

export const updateMutation = (authTokens, id, slug) => {
  return useMutation((data) =>
    axios.put(`${API_URL}/store/products/${slug}/reviews/${id}/`, data, {
      headers: {
        Authorization: `JWT ${authTokens.access}`,
      },
    })
  );
};
