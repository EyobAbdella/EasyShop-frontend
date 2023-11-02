import React from "react";
import Card from "./Card";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Feed = () => {
  const slideLeft = () => {
    var slider = document.getElementById("slider" + 1);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + 1);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className='px-2 h-full'>
      <h2 className='text-slate-200 font-semibold text-xl py-1 pl-2 bg-black mb-2'>
        Electronics
      </h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        <div
          id={"slider" + 1}
          className='flex gap-x-4 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </div>
  );
};

export default Feed;
