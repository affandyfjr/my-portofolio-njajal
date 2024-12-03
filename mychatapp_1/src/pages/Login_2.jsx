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
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const Login = () => {
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
    <div className="layar relative h-screen flex justify-center pt-36">
      <span
        className="back absolute left-0 top-0 p-3 cursor-pointer "
        onClick={() => navigate("/")}
      >
        <IoChevronBack className="fill-black size-10" />
      </span>
      <section className="login-form flex flex-col w-[90%] sm:w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[85%] items-center rounded-xl px-20 py-10 border-2 border-slate-200 bg-gradient-to-tr from-blue-400  to-blue-200">
        <h3 className="mt-5 text-2xl text-white">Login to Your Account</h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 my-5 w-full "
        >
          <div className="flex justify-between w-full">
            <input
              type="email"
              name="email"
              placeholder=" Enter email"
              value={email}
              onChange={handleChange}
              className="input-field text-black rounded-md w-full h-10"
            />
          </div>
          <div className="flex justify-between gap-5 w-full">
            <input
              type="password"
              name="password"
              placeholder=" Enter password"
              value={password}
              onChange={handleChange}
              className="input-field text-black rounded-md w-full h-10"
            />
          </div>
          <div className="flex flex-col items-center ">
            {error && <p className="error-message text-red-400">{error}</p>}
            <button
              disabled={loading}
              className=" hover:bg-slate-200 text-black rounded-lg border-[1px] border-slate-200 hover:scale-105 w-[150px] p-2 mt-2 "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="or w-full flex justify-between items-center ">
          <hr className="w-[40%] bg-slate-200" />
          <p className="flex items-center text-white">or</p>
          <hr className="w-[40%] bg-slate-200" />
        </div>
        <button className="hover:text-blue-500" onClick={googleLogin}>
          Sign In White Google
        </button>
      </section>
    </div>
  );
};

export default Login;
