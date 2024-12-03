import React, { useEffect, useState } from "react";
import Img from "../assets/profile.png";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const User = ({ user1, user, selectUser, chat }) => {
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

  return (
    <div className="wrapper p-2 m-2" onClick={() => selectUser(user)}>
      <div className="user_info flex items-center justify-between">
        <div className="user_detail flex items-center w-80">
          <img
            src={user.avatar || Img}
            alt="avatar"
            className="avatar mr-2 size-16 rounded-full border border-slate-400"
          />
          <h4 className="text-slate-300">{user.name}</h4>
        </div>
        <div
          className={`user_status ${user.isOnline ? "bg-green-600 size-4 rounded-full" : "bg-red-600 size-4 rounded-full"}`}
        />
        {data?.unread && <span className="new-message-indicator">New</span>}
      </div>
      {data && <p className="truncate">{data.text}</p>}
    </div>
  );
  
  
};

export default User;