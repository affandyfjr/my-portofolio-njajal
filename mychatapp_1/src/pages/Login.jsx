//usState untuk mengatur state lokal (state -> keadaan || negara )
import React, { useState } from "react";
//fungsi dari firebase -> email password,google
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
//objek yg di iimpor dari file firebase
import { auth, db } from "../firebase";
//fungsi dari firestore
import { updateDoc, doc, setDoc } from "firebase/firestore";
//navigasi programatik (hook dari react-router-dom)
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const Login = ({ isTransitioning, handleModeSwitch }) => {
  //menginisialisasi untuk menyimpan
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();
  const { email, password, error, loading } = data;

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

  //fungsi memperbarui state saat user mengetik
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
      return;
    }
    setData({ ...data, error: null, loading: true });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: result.user.uid,
          name: "Anonymous",
          email: result.user.email,
          avatar: "path/to/default/profile.png",
          isOnline: true,
        });
      } else {
        await updateDoc(userDocRef, { isOnline: true });
      }

      setData({
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

  return (
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
          Sign in to your Account
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
            or use your email to sign in
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[80%] ">
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
            {error && <p className="error-message text-red-400">There was an error. Please try again.</p>}
            <button
              disabled={loading}
              className="bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700  w-full h-12 p-2 flex justify-center items-center "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <small className="text-black">
          Dont have an account?
          <a
            className="text-blue-400 hover:text-blue-600 font-semibold ml-1 cursor-pointer"
            onClick={handleModeSwitch}
          >
            Sign Up
          </a>
        </small>
      </section>
    </div>
  );
};

export default Login;
