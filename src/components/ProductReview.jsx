import React, { useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ReviewForm from "./ReviewForm";
import { FaCircleUser } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";

const ProductReview = ({ reviews }) => {
  const { authTokens } = useContext(AuthContext);
  let userId;

  if (authTokens) {
    userId = jwtDecode(authTokens.access).user_id;
  }

  const currentUserReview = reviews.find(
    (review) => review.user.user_id === userId
  );

  return (
    <div className='mt-3 border-t border-gray-200 pt-5 px-2 sm:px-6'>
      <h1 className='mb-4 text-2xl font-semibold border-b border-gray-200 w-fit'>
        Reviews
      </h1>
      {reviews.map((item) => (
        <div key={item.id} className='mb-7'>
          <div className='flex items-center gap-x-2.5 mb-0.5'>
            <FaCircleUser className='text-gray-500' size={45} />
            <h1 className='text-xl font-semibold'>
              {item.user.first_name} {item.user.last_name}
            </h1>
          </div>
          <div className='flex pl-12'>
            {[...Array(item.rating)].map((_, index) => (
              <AiFillStar key={index} className='text-yellow-500' size={23} />
            ))}
            {[...Array(5 - item.rating)].map((_, index) => (
              <AiOutlineStar key={index} size={23} />
            ))}
          </div>
          <p className='pl-14'>{item.review}</p>
        </div>
      ))}
      <ReviewForm currentUserReview={currentUserReview} />
    </div>
  );
};

export default ProductReview;
