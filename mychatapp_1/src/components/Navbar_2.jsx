import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth_2";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    if (user) {  // Pastikan `user` ada sebelum memanggil `auth.currentUser`
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        isOnline: false,
      });
      await signOut(auth);
      navigate("/login");
    }
  };

  return (
    <nav className="flex items-center justify-between h-16 px-5 bg-slate-900 border-b-2 border-slate-600">
      <h3>
        <Link to="/" className="text-white text-2xl font-bold">
          MyChat
        </Link>
      </h3>
      <div>
        {user ? (
          <>
            <Link to="/profile" className="text-white text-xl font-semibold">
              Profile
            </Link>
            <button className="text-white text-xl font-semibold ml-4 hover:bg-slate-600 rounded-lg hover:border-[1px] hover:border-slate-400 hover:scale-105 w-[100px] p-2 m-2 " onClick={handleSignOut}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="text-white text-xl font-semibold mr-5">
              Register
            </Link>
            <Link to="/login" className="text-white text-xl font-semibold">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
