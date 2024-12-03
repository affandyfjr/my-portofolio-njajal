import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import PrivateRoute from "./components/PrivateRoute_1";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rute privat dibungkus dengan PrivateRoute */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Route>a
      </Routes>
    </>
  );
}

export default App;
