import React, { useEffect, useState, useContext, useRef } from "react";
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
  deleteDoc,
} from "firebase/firestore";
import User from "../components/User_2_a";
import MessageForm from "../components/MessageForm";
import Message from "../components/Messages_2";
import { AuthContext } from "../context/auth_2";
import { FiMessageSquare } from "react-icons/fi";
import Navbar from "../components/Navbar_3";
import { IoChevronBack, IoMenu } from "react-icons/io5";
import gambar_1 from "../assets/profile.png";
import { storage } from "../firebase2";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Profile from "./Profile_2";

const Home = () => {
  const { user, userProfile } = useContext(AuthContext); // mengambil data user dari AuthContext
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [msgs, setMsgs] = useState([]);
  //responsive mobile
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [profile, setIsProfile] = useState(true);
  const user1 = currentUser.uid;
  const user2 = user.uid;
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  //klik luar keluar
  const menuRef = useRef(null);
  console.log(user1,"user1")
  console.log(user2,"user2")
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

  //effect ref
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Jika klik di luar "menu samping"
        setIsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //upload file ke storage
  const uploadFile = async (file, user1, user2) => {
    if (!file) {
      console.error("No file provided");
      return null;
    }
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const storageRef = ref(storage, `${id}/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Upload failed", error);
      throw error;
    }
  };

  const selectUser = async (user) => {
    if (user) {
      setChat(user);
      const user2 = user.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      console.log("user1", user1);
      console.log("user2", user2);
      console.log("userUid", user.uid);
      // // Mark messages as read when user selects the conversation
      // await updateDoc(doc(db, "lastMsg", id), { unread: false });

      const msgRef = collection(db, "messages", id, "chat");
      const q = query(msgRef, orderBy("createdAt", "asc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messages = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        setMsgs(messages);
      });

      setIsRightVisible(true);

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

      let fileUrl = null;
      if (file || text) {
        if (file) {
          fileUrl = await uploadFile(file, user1, user2); // Kirim file jika ada
        }

        await addDoc(collection(db, "messages", id, "chat"), {
          text,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          fileUrl: fileUrl || null,
        });
        console.log("File in state:", file); // Cek file di state
        console.log("File being uploaded:", file?.name); // Cek file sebelum di-upload
        setText("");
        setFile(null); // Reset file input
      }
    }
  };

  // //delete messeges
  const deleteMessage = async (chatId) => {
   
    console.log("id", id, "chatId", chatId);
    if (!id && !chatId) return;
    await deleteDoc(doc(db, "messages", id, "chat", chatId));
  };
  //delete messeges gpt
  //  const deleteMessage = async (user1, user2, chatId) => {
  //   try {
  //     if (!user1 || !user2 || !chatId) {
  //       console.error("Invalid parameters: user1, user2, or chatId is missing.");
  //       return;
  //     }

  //     // Tentukan Room ID berdasarkan user1 dan user2
  //     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  //     console.log("Deleting message with id:", id, "chatId:", chatId);

  //     // Referensi ke dokumen pesan yang akan dihapus
  //     const messageDocRef = doc(db, "messages", id, "chat", chatId);

  //     // Hapus dokumen
  //     await deleteDoc(messageDocRef);

  //     console.log("Message deleted successfully.");
  //   } catch (error) {
  //     console.error("Error deleting message:", error.message);
  //   }
  // };

  //edit messeges
  const editMessage = async (id, chatId, newText) => {
    await updateDoc(doc(db, "messages", chatId, "chat", id), { text: newText });
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <>
      <div className="induk flex relative bg-biru">
        <Navbar />
        {/* menu samping absolute*/}
        <div
          ref={menuRef}
          className={`${!isMenu ? "-translate-x-[132px]" : "translate-x-2"} inset-0 menu_samping z-10 absolute  w-52 bg-biru h-[99vh]  flex flex-col justify-between p-3 pt-[85px] transition-all`}
        >
          <div className="atas  flex flex-col ">
            <span className="w-[40px] h-10 rounded hover:bg-slate-300/50 flex items-center mb-6"></span>
            <span
              className="w-full h-10 rounded hover:bg-slate-300/50 flex items-center cursor-pointer pl-14"
              alt="Chat"
              onClick={() => setIsRightVisible(false)}
            >
              Chat
            </span>
          </div>
          <div className="bawah ">
            <span className="w-full h-12 rounded hover:bg-slate-300/50 cursor-pointer flex items-center mb-7 pl-14">
              Profile
            </span>
          </div>
        </div>
        {/* profile */}
        <div
          className={`${profile ? "hidden" : "block"} z-20 transition-all duration-700 absolute left-16 bottom-14 profile w-auto p-4 bg-slate-100 border border-biru rounded-md shadow-lg shadow-slate-200`}
        >
          <Profile />
        </div>
        {/* logo */}
        <div className="logo z-10 relative left-0 top-0 w-[75px]  h-[99vh] flex flex-col justify-between p-3 pr-5 pt-[85px] pb-10 transition-all">
          <div className="w-full h-full">
            {/* This span is now the topmost layer */}
            <span className="  flex items-center mb-6 z-30 relative">
              <IoMenu
                className={`z-30 size-10 or-pointer text-4xl rounded  hover:bg-slate-300/50 p-3`}
                onClick={() => setIsMenu(true)}
              />
            </span>
            <span className="w-full h-10 hover:bg-slate-300/50 rounded flex items-center z-30 relative">
              <FiMessageSquare
                className={`z-30 text-white text-4xl cursor-default mr-3  pl-3 `}
                onClick={() => setIsRightVisible(false)}
              />
            </span>
          </div>
          <div
            className="gambar h-auto relative cursor-default"
            onClick={() => setIsProfile(!profile)}
          >
            <div className="z-20  size-12 pl-0.5">
              {/* Foto Profil */}
              {user && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="avatar size-full mr-2 rounded-full border border-slate-400 object-cover"
                  />
              ) : (
                <div className="avatar size-12  mr-2  flex items-center justify-center rounded-full bg-slate-500 text-white font-bold">
                  {user?.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* halaman chat */}
        <div className="absolute z-0 top-0 left-16 home_container pt-16 flex w-[85vw] sm:w-[94.6vw] h-[99vh] text-black ">
          {/* left side: User list */}
          <div
            className={`${
              isRightVisible ? "hidden" : "block"
            } users_container w-full sm:w-[40%] h-auto border-r-4 border-biru bg-white rounded-tl-xl overflow-y-auto sm:block ml-3 pt-3`}
          >
            {users.map((user, msg) => (
              <User
                key={user.uid}
                user={user}
                selectUser={selectUser}
                user1={user1}
                chat={chat}
              />
            ))}
          </div>

          <div
            className={`${
              isRightVisible ? "block" : "hidden"
            } messages_container h-[89vh] w-full p-2 sm:block sm:w-[50%] md:w-[60%] bg-white relative`}
          >
            {chat ? (
              <>
                <div className="messages_user flex pb-3 pt-1 text-xl font-semibold border-b-2 border-slate-400">
                  <div className="back_button sm:hidden pl-2">
                    <button
                      onClick={() => setIsRightVisible(false)}
                      className=" px-4 py-2 hover:bg-slate-400/50 rounded"
                    >
                      <IoChevronBack className="stroke-black text-xl" />
                    </button>
                  </div>
                  <div className="flex items-center ml-2 w text-xl font-semibold ">
                    <h3>{chat.name}</h3>
                  </div>
                </div>
                <div className="messages h-[70vh] overflow-y-auto border-b-2 border-slate-400 bg-wa">
                  {msgs.length ? (
                    msgs.map((msg, i) => (
                      <Message
                        key={i}
                        msg={msg}
                        user1={user1}
                        handleDelete={deleteMessage}
                        editMessage={editMessage}
                      />
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
                  uploadFile={uploadFile}
                  setText={setText}
                  file={file}
                  setFile={setFile}
                  removeFile={removeFile}
                  className="absolute bottom-0"
                />
              </>
            ) : (
              <h3 className=" text-center text-xl text-slate-600 font-semibold mt-5">
                Select a user to start a conversation
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

//sebelum tanya gpt tentang crud.
//fitur sudah ngganteng
