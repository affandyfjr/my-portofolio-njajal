import React from "react";


const bglogin = ({ isRegister, handleModeSwitch }) => {
  return (
    <div className=" w-[100%] h-[100%] flex justify-center ">
      <div className={` top-28 left-28 flex flex-col gap-5 mt-20`}>
        <h2 className="text-4xl text-blue-400 font-bold text-center">
          {!isRegister ? "Hello, Friends!" : "Welcome Back!"}
        </h2>
        <p className="text-white font-semibold text-base">
          {isRegister
            ? "Enter your email and password to sign in"
            : "Enter your email and password to sign up"}
        </p>
        <button
          className="p-2 rounded-md bg-white hover:bg-blue-400 text-blue-400 hover:text-white"
          onClick={handleModeSwitch}
        >
          {isRegister ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default bglogin;
