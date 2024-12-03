import React from "react";

const Button = () => {
  return (
    <div className="relative group ">
      <button className=" relative z-10 bg-hitam px-10 py-2 w-full rounded-full text-putih sm:text-sm xl:text-lg group-hover:block flex justify-center items-center">
        Go Chat
      </button>
      <div className="absolute -top-1  z-0 -left-1 hidden group-hover:block w-[108%] h-[120%]  rounded-full bg-gradient-to-r from-blue-500 via-blue-300 to-transparent p-1 group"></div>
    </div>
  );
};

export default Button;
