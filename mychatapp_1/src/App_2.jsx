import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/HalLogin";
import Profile from "./pages/Profile_2";
import PrivateRoute from "./components/PrivateRoute_2";
import Home from "./pages/home";
import ErrorBoundary from "./context/ErrorBoundary";
import "./App.css";
import LP from "./pages/LP_2";

function App() {
  return (
    <>
      
      <Routes >
        <Route path="/" element={<LP />} />
        <Route path="/login" element={<Login />}/>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/Home" element={<ErrorBoundary><Home /></ErrorBoundary>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

//====================