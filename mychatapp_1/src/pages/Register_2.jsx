import React, { useState } from "react";
//fungsi dari firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
//untuk menyimpan data dari pengguna
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import profile from "../assets/profile.png";

const Register = () => {
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
    if (!name || !email || !password)
      return setData({ ...data, error: "All fields are required" });
    setData({ ...data, error: null, loading: true });

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        avatar: profile,
        isOnline: true,
      });

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

  return (
    <div className="layar relative min-h-screen flex justify-center items-center bg-slate-900">
      <span
        className="back absolute left-0 top-0 p-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoChevronBack className="fill-white size-10" />
      </span>
      <section className="register-form flex flex-col bg-slate-800 w-[40%] h-auto items-center rounded-xl">
        <h3 className="mt-10 text-2xl">Create Your Account</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 my-5 p-5 ">
          <div className="flex justify-between ">
            <label>Name</label>
            <input
              type="name"
              name="name"
              placeholder=" Enter name"
              value={name}
              onChange={handleChange}
              className="input-field text-black rounded-md"
            />
          </div>
          <div className="flex justify-between ">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder=" Enter email"
              value={email}
              onChange={handleChange}
              className="input-field text-black rounded-md"
            />
          </div>
          <div className="flex justify-between gap-5">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder=" Enter password"
              value={password}
              onChange={handleChange}
              className="input-field text-black rounded-md"
            />
          </div>
          <div className="btn flex flex-col items-center ">
            {error && <p className="error-message text-red-500 ">{error}</p>}
            <button
              disabled={loading}
              className="w-[150px] bg-slate-500 hover:bg-slate-600 rounded-lg border-[1px] border-slate-400 hover:scale-105 p-2 my-2"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;

//==============
