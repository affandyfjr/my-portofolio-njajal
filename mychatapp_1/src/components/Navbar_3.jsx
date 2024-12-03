import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc,getDoc,setDoc } from "firebase/firestore";
import { AuthContext } from "../context/auth_2";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      
      // Check if document exists
      if (userSnap.exists()) {
        await updateDoc(userRef, { isOnline: false });
      } else {
        // Create the document if it doesn't exist
        await setDoc(userRef, { isOnline: false });
      }
      
      await signOut(auth);
      navigate("/");
    }
  };
  return (
    <nav className={`fixed z-50 flex items-center justify-between h-16 w-full px-5  bg-biru ${user? "" : "shadow-lg shadow-slate-200"} `}>
      <h3>

        <Link to="/home" className="text-white text-2xl font-bold cursor-default">
          QuickChat
        </Link>
      </h3>
      <div>
        {user ? (
          <>
            <button className="hidden sm:block text-black text-lg font-semibold ml-4 bg-white rounded-full hover:bg-slate-200 w-[110px] p-2 m-2 "
             onClick={handleSignOut}>
              Log Out
            </button>
            <button className={`sm:hidden p-3 bg-white hover:bg-slate-300/50 rounded-sm`} onClick={handleSignOut}>
            |=|
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-slate-200 hover:border-b-2 hover:border-white text-xl font-semibold mr-5">
              Register
            </Link>
            <Link to="/login" className="text-white hover:text-slate-200 hover:border-b-2 hover:border-white text-xl font-semibold">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
