import React from 'react'
import { IoMdStar } from 'react-icons/io'

const Slide_scrool2 = ({logo,bg_color,text,judul,angka,reviews}) => {
  return (
    <div className="slide_1 relative group flex md:w-[70vw] h-[70vh] sm:h-[50vh] xl:h-[60vh] basis-1/3 mx-10 sm:mx-0">
    <div className="layar relative z-10 flex bg-putih flex-col items-center justify-between md:items-start p-5 xl:p-10 h-full w-full rounded-lg space-y-4 ">
      <p className={`logo w-10 h-10 xl:w-16 xl:h-16 rounded-full text-white flex justify-center items-center ${bg_color}`}>
        {logo}
      </p>
      <h2 className="font-semibold text-center md:text-left text-xl sm:text-2xl md:text-3xl ">{judul}</h2>
      <p className="text-center text-sm md:text-left sm:text-sm md:text-base ">
       {text}
      </p>
      <div className="kaki flex space-x-2 sm:space-x-1">
        <div className="logo flex justify-center items-center">
          <IoMdStar className="fill-oranye" />
        </div>
        <h5 className="font-bold sm:text-sm xl:text-xl">{angka}</h5>
        <h5 className="text-gray sm:text-sm xl:text-xl">{reviews}</h5>
      </div>
    </div>
    <div className="efect z-0 group-hover:block hidden absolute -top-3 -left-2 xl:-left-[13px] rounded-lg w-[105%] sm:w-[108%] xl:w-[108%] h-[108%] sm:h-[107%] xl:h-[106%] bg-gradient-to-t from-blue-500 via-blue-300 to-transparent "></div>
  </div>
  )
}

export default Slide_scrool2