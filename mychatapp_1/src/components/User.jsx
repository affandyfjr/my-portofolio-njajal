import React, { useEffect, useState } from "react";
import Img from "../assets/profile.png";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const User = ({ user1, user, selectUser, chat }) => {
  //untuk lastmessegae
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
  id
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, 'lastMsg', id), (doc) => {
      setData(doc.data())
    })
    return () => unsub()
  },[])

  return (
    <div className="wrapper p-2 m-2" onClick={() =>selectUser()}>
      {/* <div className={`user_wrapper p-2 m-2 ${chat.name === user.name && "bg-slate-800"} `} onClick={() =>selectUser()}> */}
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
        >
          {user.isOnline}
        </div>
      </div>
      {data && <p className="truncate">{data.text}</p>}
    </div>
  );
};

export default User;
