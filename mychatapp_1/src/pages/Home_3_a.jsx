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
  updateDoc,
} from "firebase/firestore";
import User from "../components/User_2_a";
import MessageForm from "../components/MessageForm";
import Message from "../components/Messages_2";
import { AuthContext } from "../context/auth_2";
import { FiMessageSquare } from "react-icons/fi";
import Navbar from "../components/Navbar_3";
import { IoMenu } from "react-icons/io5";
import gambar_1 from "../assets/profile.png";

const Home = () => {
  const { user } = useContext(AuthContext); // mengambil data user dari AuthContext
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(null);
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  //responsive mobile
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [isMenu, setIsMenu] = useState(true);
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

  const selectUser = async (user) => {
    if (user) {
      setChat(user);
      const user2 = user.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

      // Mark messages as read when user selects the conversation
      await updateDoc(doc(db, "lastMsg", id), { unread: false });

      const msgRef = collection(db, "messages", id, "chat");
      const q = query(msgRef, orderBy("createdAt", "asc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        setMsgs(messages);
      });

      setIsRightVisible(true)

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
      // Save the last message
      await setDoc(doc(db, "lastMsg", id), {
        text,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        unread: false, // When logged-in user sends a message, mark as unread
      });

      setText("");
    }
  };

  return (
    <>
      <div className="induk flex relative">
        <Navbar />
        {/* menu samping absolute*/}
        <div
          className={`${!isMenu ? "-left-[135px] bg-slate-100 border-r-2 border-slate-400" : "left-0"} menu_samping z-10 absolute top-0 w-52 bg-slate-500 h-[99vh]  flex flex-col justify-between p-3 pt-[85px] transition-all`}
        >
          <div className="atas  flex flex-col ">
            <span className="w-[40px] h-10 hover:bg-slate-300/50 flex items-center mb-6"></span>
            <span className="w-full h-10 hover:bg-slate-400/50 flex items-center pl-14">
              Chat
            </span>
          </div>
          <div className="bawah ">
            <span className="w-full h-10 hover:bg-slate-300/50 flex items-center mb-6 pl-14">Profile</span>
          </div>
        </div>
        {/* logo */}
        <div className="logo z-10 relative left-0 top-0 w-20  h-[99vh] flex flex-col justify-between p-3 pr-5 pt-[85px] pb-10 transition-all">
          <div className="w-full h-full">
            {/* This span is now the topmost layer */}
            <span className="w-full h-10 hover:bg-slate-300/50 flex items-center mb-6 z-30 relative">
              <IoMenu
                className={`z-30 ${isMenu ? "stroke-white" : "stroke-slate-700"} cursor-pointer text-4xl pl-3`}
                onClick={() => setIsMenu(!isMenu)}
              />
            </span>
            <span className="w-full h-10 hover:bg-slate-300/50 flex items-center z-30 relative">
              <FiMessageSquare
                className={`z-30 text-white text-4xl cursor-pointer mr-3 ${isMenu ? "stroke-white" : "stroke-slate-400"} pl-3 `}
                onClick={() => setIsRightVisible(!isRightVisible)}
              />
            </span>
          </div>
          <div className="gambar w-full h-auto relative">
            <div className="z-20 w-10 h-10 pl-0.5 ">
              {/* Foto Profil */}
              {user.photoURL ? (
                <img
                  src={gambar_1}
                  alt="avatar"
                  className="avatar size-10 rounded-full border border-slate-400"
                />
              ) : (
                <div className="avatar absolute bottom-0 pl-0.5 size-8 flex items-center justify-center rounded-full bg-yellow-400 text-white font-bold z-20">
                  {user.displayName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* halaman chat */}
        <div className="absolute z-0 top-0 left-16 home_container pt-16 flex w-[85vw] sm:w-[94.6vw] h-[99vh] bg-yellow-400 text-black ">
          {/* left side: User list */}
          <div
            className={`${
              isRightVisible ? "hidden" : "block"
            } users_container w-full shrink-0 h-auto border-r-2 border-slate-400 overflow-y-auto sm:block sm:w-[40%] mt-3`}
          >
            {users.map((user, msg) => (
              <User
                key={user.uid}
                user={user}
                selectUser={selectUser}
                user1={user1}
                chat={chat}
                // formatRelativeTime={formatRelativeTime}
                // msg={msg}
              />
            ))}
          </div>
          {/* right side: Messages */}
          <div
            className={`${
              isRightVisible ? "block" : "hidden"
            } messages_container h-[89vh] w-full p-2 sm:block sm:w-[50%] md:w-[60%] relative`}
          >
            {chat ? (
              <>
                <div className="messages_user flex justify-center pb-3 pt-1 text-xl font-semibold border-b-2 border-slate-400">
                  <h3 className="">{chat.name}</h3>
                </div>
                {/* Messages display */}
                <div className="messages h-[70vh] overflow-y-auto border-b-2 border-slate-400 ">
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
              <>
                <h3 className="no_conv flex justify-center text-xl text-slate-600 font-semibold mt-5">
                  Select a user to start a conversation
                </h3>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
// {`sembunyi bg-slate-300absolute top-0 left-0 z-10 flex flex-col justify-between p-3 pt-[60px] w-56 h-[98vh] transition-all`}
{
  /* <div
            className={`sembunyi absolute -top-10 z-10 flex flex-col justify-between p-3 ${!isMenu ? "left-0 bg-slate-400 shadow-xl shadow-slate-500" : "-left-40 bg-white border-r-2 border-slate-200"} w-56 h-[108%] transition-all `}
          >
            <div className="w-full text-xl pt-20">
              <p className="text-white pl-16 hover:bg-slate-300/50 cursor-pointer h-10 flex items-center">
                chat
              </p>
            </div>
            <div className="w-full text-xl pb-2">
              <p className="text-white pl-16 hover:bg-slate-300/50 cursor-pointer h-10 flex items-center">
                profile
              </p>
            </div>
          </div> */
}
