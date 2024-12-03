import React, { useState } from "react";
import Bglogin from "../components/bglogin";
import Login from "./Login";
import GambarBelakang from "../components/GambarBelakang";
import gambar from "../assets/kuning.png";
import Register from "./Register";
// import Register from "./Register";

const HalLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // Status transisi

  const handleModeSwitch = () => {
    setIsTransitioning(true); // Mulai transisi
    setIsRegister((prev) => !prev); // Ubah mode
    // Hentikan transisi setelah animasi selesai
    setTimeout(() => setIsTransitioning(false), 700); // Sesuaikan durasi dengan `transition-all`
  };

  return (
    <div className=" relative w-full h-screen overflow-y-hidden overflow-x-hidden ">
      <GambarBelakang className="absolute w-full h-full -z-10" />
      <div
        className={`bg-blue-100/50 hidden sm:block absolute inset-0  w-1/2 h-full transition-all duration-700 ease-in-out ${isRegister ? "translate-x-full" : "translate-x-0"} ${isTransitioning ? "scale-90" : "scale-100"}`}
      >
        <Bglogin
          isRegister={isRegister}
          setIsRegister={setIsRegister}
          handleModeSwitch={handleModeSwitch}
        />
      </div>
      <div
        className={`login bg-white absolute inset-0  w-full sm:w-1/2 h-screen flex justify-center items-center transition-all duration-700 ease-in-out ${
          isRegister ? "sm:translate-x-0 " : "sm:translate-x-full"
        } ${isTransitioning ? "scale-110 " : "scale-100"}`}
      >
        {isRegister ? (
          <Login
            isTransitioning={isTransitioning}
            handleModeSwitch={handleModeSwitch}
          />
        ) : (
          <Register
            isTransitioning={isTransitioning}
            handleModeSwitch={handleModeSwitch}
          />
        )}
      </div>
      <img
        src={gambar}
        alt=""
        className={`absolute bottom-0  z-10 w-[30%]  h-auto transition-all duration-700 ease-in-out ${isRegister ? " right-96" : "left-96"} ${isTransitioning ? "translate-x-full" : ""}`}
      />
    </div>
  );
};

export default HalLogin;

// import React, { useState, useEffect } from "react";

// const AuthPage = () => {
//   const [isRegister, setIsRegister] = useState(false); // Mode tampilan
//   const [isTransitioning, setIsTransitioning] = useState(false); // Status transisi

//   const handleModeSwitch = () => {
//     setIsTransitioning(true); // Mulai transisi
//     setIsRegister((prev) => !prev); // Ubah mode

//     // Hentikan transisi setelah animasi selesai
//     setTimeout(() => setIsTransitioning(false), 700); // Sesuaikan durasi dengan `transition-all`
//   };

//   return (
//     <div className="relative h-screen w-full flex items-center justify-center bg-gray-100 overflow-hidden">
//       {/* Background Layer */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 blur-md opacity-70 transform scale-110"></div>

//       {/* Container */}
//       <div className="relative w-4/5 h-4/5 bg-white rounded-2xl shadow-2xl overflow-hidden flex">
//         {/* Bagian Kiri */}
//         <div
//           className={`absolute inset-0 w-1/2 h-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex flex-col justify-center items-center transform transition-all duration-700 ease-in-out ${
//             isRegister
//               ? "translate-x-full opacity-50"
//               : "opacity-100"
//           } ${
//             isTransitioning ? "scale-90" : "scale-100"
//           }`}
//         >
//           <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg">
//             {isRegister ? "Welcome Back!" : "Hello, Friend!"}
//           </h1>
//           <p className="mb-8 text-center text-lg">
//             {isRegister
//               ? "To stay connected, please login with your personal info."
//               : "Start your journey with us by creating an account."}
//           </p>
//           <button
//             className="bg-white text-blue-500 px-8 py-3 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:-rotate-2 hover:shadow-2xl"
//             onClick={handleModeSwitch}
//           >
//             {isRegister ? "Login" : "Register"}
//           </button>
//         </div>

//         {/* Bagian Login/Register */}
//         <div
//           className={`absolute inset-0 w-1/2 h-full bg-white flex justify-center items-center shadow-lg transform transition-all duration-700 ease-in-out ${
//             isRegister ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           {isRegister ? (
//             <div className="w-80">
//               <h2 className="text-3xl font-bold mb-4 text-gray-700">Register</h2>
//               <form>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   className="block w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="block w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="block w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
//                 >
//                   Register
//                 </button>
//               </form>
//             </div>
//           ) : (
//             <div className="w-80">
//               <h2 className="text-3xl font-bold mb-4 text-gray-700">Login</h2>
//               <form>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="block w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="block w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
//                 >
//                   Login
//                 </button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;
