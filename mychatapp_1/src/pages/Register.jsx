import React, { useState } from "react";
//fungsi dari firebase
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth, db } from "../firebase";
//untuk menyimpan data dari pengguna
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import profile from "../assets/profile.png";
import { FcGoogle } from "react-icons/fc";

const Register = ({ isTransitioning, handleModeSwitch }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const navigate = useNavigate();
  const { name, email, password, error, loading } = data;

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
      return;
    }
    setData({ ...data, error: null, loading: true });

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        avatar: profile,
        isOnline: true,
      };

      await setDoc(doc(db, "users", result.user.uid), userData);

      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/home");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  //login google
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const { uid, displayName, email, photoURL } = result.user;

      // Save or update user data in Firestore
      await setDoc(
        doc(db, "users", uid),
        {
          uid,
          name: displayName,
          email,
          avatar: photoURL,
          isOnline: true,
        },
        { merge: true }
      );

      navigate("/home");
      console.log("Logged in with Google");
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    // <div className="layar relative w-full h-full flex justify-center items-center bg-slate-900">
    //   <span
    //     className="back absolute left-0 top-0 p-3 cursor-pointer"
    //     onClick={() => navigate("/")}
    //   >
    //     <IoChevronBack className="fill-white size-10" />
    //   </span>
    //   <section className="register-form flex flex-col bg-slate-800 w-[40%] h-auto items-center rounded-xl">
    //     <h3 className="mt-10 text-2xl">Create Your Account</h3>
    //     <form onSubmit={handleSubmit} className="flex flex-col gap-5 my-5 p-5 ">
    //       <div className="flex justify-between ">
    //         <label>Name</label>
    //         <input
    //           type="name"
    //           name="name"
    //           placeholder=" Enter name"
    //           value={name}
    //           onChange={handleChange}
    //           className="input-field text-black rounded-md"
    //         />
    //       </div>
    //       <div className="flex justify-between ">
    //         <label>Email</label>
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder=" Enter email"
    //           value={email}
    //           onChange={handleChange}
    //           className="input-field text-black rounded-md"
    //         />
    //       </div>
    //       <div className="flex justify-between gap-5">
    //         <label>Password</label>
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder=" Enter password"
    //           value={password}
    //           onChange={handleChange}
    //           className="input-field text-black rounded-md"
    //         />
    //       </div>
    //       <div className="btn flex flex-col items-center ">
    //         {error && <p className="error-message text-red-500 ">{error}</p>}
    //         <button
    //           disabled={loading}
    //           className="w-[150px] bg-slate-500 hover:bg-slate-600 rounded-lg border-[1px] border-slate-400 hover:scale-105 p-2 my-2"
    //         >
    //           {loading ? "Creating..." : "Register"}
    //         </button>
    //       </div>
    //     </form>
    //   </section>
    // </div>
    <div
      className={`bungkus animate-fade-in relative w-[500px] h-[80%] flex justify-center ${isTransitioning ? "scale-110" : "scale-100"}`}
    >
      <span
        className="back absolute left-0 top-0 p-3 cursor-pointer "
        onClick={() => navigate("/")}
      >
        <IoChevronBack className="fill-black size-10" />
      </span>
      <section className="login-form flex flex-col w-[100%] gap-8  items-center">
        <h3 className=" text-4xl text-blue-400 font-bold text-center">
          Create Account
        </h3>
        <button
          className="rounded-full p-2 border border-slate-300 hover:bg-slate-300 text-black text-xs font-semibold flex flex-row"
          onClick={googleLogin}
        >
          <FcGoogle className="size-5 mr-2" />
          sign in white google
        </button>
        <div className="or w-auto flex items-center ">
          <p className="flex items-center text-slate-300 font-semibold">
            or use your email to sign up
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[80%] ">
          <div className="w-full">
            <input
              type="name"
              name="name"
              placeholder="Username"
              value={name}
              onChange={handleChange}
              className="input-field text-black bg-blue-200 pl-2 rounded-md w-full h-12 hover:shadow-md"
            />
          </div>
          <div className="w-full">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="input-field text-black bg-blue-200 pl-2 rounded-md w-full h-12 hover:shadow-md"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              name="password"
              placeholder=" Password"
              value={password}
              onChange={handleChange}
              className="input-field text-black bg-blue-200 pl-2 rounded-md hover:shadow-md w-full h-12"
            />
          </div>
          <div className="flex flex-col items-center mt-2 ">
            {error && <p className="error-message text-red-400">{error}</p>}
            <button
              disabled={loading}
              className="bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700  w-full h-12 p-2 flex justify-center items-center "
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </div>
        </form>
        <small className="text-black">
          Have an account?
          <a
            className="text-blue-400 hover:text-blue-600 font-semibold ml-1 cursor-pointer"
            onClick={handleModeSwitch}
          >
            Sign In
          </a>
        </small>
      </section>
    </div>
  );
};

export default Register;

//==============
