import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center'>
      <ul className='flex list-none my-2'>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className='mx-1 px-3 py-2 bg-blue-500 text-white font-bold text-sm rounded-full'>
            <a
              onClick={() => paginate(number)}
              href='#'
              className='flex items-center justify-center'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;

// import React, { useState } from 'react';
// import Pagination from './Pagination';

// const MainComponent = () => {
//   const [posts, setPosts] = useState(Array.from({length: 50}, (_, i) => `Post ${i + 1}`)); // Example posts
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(10);

//   // Get current posts
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   // Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4">Posts</h1>
//       {currentPosts.map((post, index) => (
//         <h2 key={index} className="text-xl mb-2">{post}</h2>
//       ))}
//       <Pagination
//         postsPerPage={postsPerPage}
//         totalPosts={posts.length}
//         paginate={paginate}
//       />
//     </div>
//   );
// };

// export default MainComponent;
