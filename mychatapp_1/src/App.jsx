import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./pages/Register_2";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <PrivateRoute path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
