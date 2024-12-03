import React, { useEffect, useState, useContext } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  where,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import { AuthContext } from "../context/auth_2";

const Home = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(null);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const user1 = currentUser.uid;

  useEffect(() => {
    if (currentUser) {
      const userRef = collection(db, "users");
      const q = query(userRef, where("uid", "not-in", [user1]));
      const unsub = onSnapshot(q, (querySnapshot) => {
        const userList = querySnapshot.docs.map((doc) => doc.data());
        setUsers(userList);
      });
      return () => unsub();
    }
  }, [currentUser, user1]);

  const selectUser = (user) => {
    if (user) {
      setChat(user);
      const user2 = user.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      const msgRef = collection(db, "messages", id, "chat");
      const q = query(msgRef, orderBy("createdAt", "asc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        console.log("Fetched messages:", messages); 
        setMsgs(messages);
      });
      return () => unsubscribe();
    } else {
      console.log("user data is undefined");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chat) {
      const user2 = chat.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      await addDoc(collection(db, "messages", id, "chat"), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
      });
      //untuk menyimpan pesan terakhir
      await setDoc(doc(db, "lastMsg", id), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        //ditambahi
        unread: true,
      });

      setText("");
    }
  };

  return (
    <div className="home_container flex max-h-screen w-full bg-slate-800 text-white">
      {/* kanan */}
      <div className="users_container border-r-2 border-slate-500 overflow-y-auto mt-3">
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>
      {/* kiri */}
      <div className="messages_container bg-blue-800 h-[89vh] w-full p-2 relative">
        {chat ? (
          <>
            <div className="messages_user p-2 text-xl font-semibold">
              <h3>{chat.name}</h3>
            </div>
            {/* tampilan percakapan */}
            <div className="messages bg-slate-700 h-[70vh] overflow-y-auto border-b-2 border-slate-600">
              {msgs.length ? (
                msgs.map((msg, i) => (
                  <Message key={i} msg={msg} user1={user1} />
                ))
              ) : (
                <p className="flex justify-center text-xl font-semibold text-slate-600">
                  No messages
                </p>
              )}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              className="absolute bottom-0"
            />
          </>
        ) : (
          <h3 className="no_conv flex justify-center text-xl text-slate-600 font-semibold mt-5">
            Select a user to start a conversation
          </h3>
        )}
      </div>
    </div>
  );
};

export default Home;

//===================
