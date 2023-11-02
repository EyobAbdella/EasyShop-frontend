import { useContext, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { API_URL } from "../config";

const ReviewForm = ({ currentUserReview }) => {
  const { slug } = useParams();
  const [review, setReview] = useState(
    currentUserReview ? currentUserReview.review : ""
  );
  const [rating, setRating] = useState(
    currentUserReview ? currentUserReview.rating : 0
  );
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postMutation = useMutation((data) =>
    axios.post(`${API_URL}/store/products/${slug}/reviews/`, data, {
      headers: {
        Authorization: `JWT ${authTokens.access}`,
      },
    })
  );

  const updateMutation = useMutation((data) =>
    axios.put(
      `${API_URL}/store/products/${slug}/reviews/${currentUserReview.id}/`,
      data,
      {
        headers: {
          Authorization: `JWT ${authTokens.access}`,
        },
      }
    )
  );

  const handleStarClick = (index) => {
    if (rating === index + 1) {
      setRating(0);
    } else {
      setRating(index + 1);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUserReview) {
      const response = await updateMutation.mutateAsync({ review, rating });
      queryClient.setQueryData(["reviews", slug], (prevData) => {
        return prevData.map((item) =>
          item.id === response.data.id ? response.data : item
        );
      });
      return toast.success("Review updated successfully.");
    }
    if (!authTokens) {
      toast.error("Please login to review products.");
      return navigate("/login");
    } else {
      const response = await postMutation.mutateAsync({ review, rating });
      queryClient.setQueryData(["reviews", slug], (prevData) => {
        return [...prevData, response.data];
      });
      toast.success("Review added successfully.");
    }
  };

  return (
    <div className=' shadow-inner shadow-white bg-slate-100 py-4 space-y-4 px-2 sm:px-4'>
      <h1 className='w-fit text-2xl border-b border-gray-300'>Add Review</h1>
      <div className='flex gap-x-4'>
        <p className='text-xl'>Your Rating</p>
        <div className='mt-1.5 flex'>
          {[...Array(5)].map((_, index) =>
            index < rating ? (
              <AiFillStar
                className=' text-yellow-500'
                onClick={() => handleStarClick(index)}
                key={index}
                size={23}
              />
            ) : (
              <AiOutlineStar
                onClick={() => handleStarClick(index)}
                key={index}
                size={23}
              />
            )
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-y-0.5'>
          <label className='text-xl'>Your review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className='text-black rounded px-1 py-0.5 h-20 focus:ring-2 focus:ring-green-200 border border-slate-300 outline-none'
          />
        </div>
        <button
          disabled={review === "" || rating === 0}
          className={`px-10 rounded mt-2 py-2 text-slate-50 text-lg ${
            review === "" || rating === 0
              ? "bg-green-300"
              : "bg-green-700 hover:bg-green-800"
          }`}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
