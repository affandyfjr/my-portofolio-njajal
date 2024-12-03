import React, { useContext, useEffect } from "react";
import profile from "../assets/profile.png";
import { AuthContext } from "../context/auth_2"; // pastikan path ini sesuai dengan file AuthContext Anda
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { doc, getDoc } from "firebase/firestore";
import { db, } from "../firebase";

const Profile = ({setUserProfile}) => {
  const { user } = useContext(AuthContext); // mengambil data user dari AuthContext
  const navigate = useNavigate();
  console.log("poto", user.photoURL);
  console.log("name", user.displayName);

  useEffect(() => {
  const fetchUser = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProfile({
            displayName: userData.name || "Anonymous",
            email: userData.email,
            photoURL: userData.avatar || profile,
          });
        }
      }
    };
    fetchUser();
  }, [user]);

  if (!user) {
    return <p>Loading user information...</p>; // tampilkan saat data belum tersedia
  }

  return (
    <div className="profile-container flex justify-center items-center h-screen bg-yellow-400">
      <div
        className="back h-5 w-5 absolute top-0 left-0"
        onClick={() => navigate("/home")}
      >
        <button>
          <IoChevronBack className="size-4 fill-white"></IoChevronBack>
        </button>
      </div>
      <div className="profile-box bg-slate-500 flex items-center w-[400px] h-[100px] rounded shadow-lg p-4">
        <div className="relative mr-4 w-20 h-20">
          {/* Foto Profil */}
          {user.photoURL ? (
            <img
              src={user.photoURL || profile}
              alt="avatar"
              className="avatar mr-2 size-16 rounded-full border border-slate-400 object-cover"
            />
          ) : (
            <div className="avatar mr-2 size-16 flex items-center justify-center rounded-full bg-slate-500 text-white font-bold">
              {user.displayName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h3>{user.displayName || "tidak bisa  "}</h3>
          <p>{user.email}</p>
          <small>
            Joined On{" "}
            {new Date(user.metadata.creationTime).toLocaleDateString()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Profile;
