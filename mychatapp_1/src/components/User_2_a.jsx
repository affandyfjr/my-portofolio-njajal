import React, { useEffect, useState } from "react";
import Img from "../assets/profile.png";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { CgProfile } from "react-icons/cg";

const User = ({ user1, user, selectUser, chat, formatRelativeTime, msg }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      if (doc.exists()) {
        setData(doc.data());
      }
    });
    return () => unsub();
  }, [user1, user2]);

  // Check if the user is selected
  const isSelected = chat?.uid === user.uid;

  // Determine if the "New" message sign should be displayed
  const showNewMessage = data?.unread;
  //   && chat?.uid !== user.uid; // Show "New" if the user isn't talking to this person

  return (
    <div
      className={`wrapper p-2 mx-3 w-11/12 border-b-2 border-slate-300/50  rounded-md cursor-pointer ${isSelected ? "bg-slate-300" : "hover:bg-slate-200/50"}`}
      onClick={() => selectUser(user)}
    >
      <div className="user_info flex items-center justify-between ">
        <div className="user_detail flex items-center">
          {/* //poto profile */}
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="avatar mr-2 size-16 rounded-full border border-slate-400"
            />
          ) : (
            // awalan
            <div className="avatar mr-2 size-16 flex items-center justify-center rounded-full bg-blue-400 text-white font-semibold text-3xl">
              {user.name ? (
                user.name?.charAt(0).toUpperCase()
              ) : (
                <CgProfile className="size-16" />
              )}
            </div>
          )}
        </div>
        {/* username,pesan terakhir */}
        <div className=" w-[80%] flex flex-col justify-around">
          <h4 className="text-black text-lg font-semibold">{user.name}</h4>

          <p className="text-sm text-gray-500 truncate w-48">{user.lastMsg}</p>
        </div>
        {/* isonline,tanggal */}
        <div className="wadah mr-1">
          {user.isOnline ? (
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
            </span>
          ) : (
            <span className="inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          )}

          {/* Show "New" message indicator if unread */}
          {showNewMessage && (
            <span className="new-message-indicator text-xs bg-red-500 text-white rounded-full p-1 ml-2">
              New
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
