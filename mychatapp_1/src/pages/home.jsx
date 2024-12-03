// import React, { useEffect, useState, useContext, useRef } from "react";
// import { db, auth } from "../firebase";
// import {
//   collection,
//   query,
//   onSnapshot,
//   where,
//   addDoc,
//   Timestamp,
//   orderBy,
//   setDoc,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import User from "../components/User_2_a";
// import MessageForm from "../components/MessageForm";
// import Message from "../components/Messages_2";
// import { AuthContext } from "../context/auth_2";
// import { FiMessageSquare } from "react-icons/fi";
// import Navbar from "../components/Navbar_3";
// import { IoChevronBack, IoMenu } from "react-icons/io5";
// import gambar_1 from "../assets/profile.png";
// import { storage } from "../firebase2";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const Home = () => {
//   const { user, userProfile } = useContext(AuthContext); // mengambil data user dari AuthContext
//   const { user: currentUser } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [chat, setChat] = useState(null);
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [msgs, setMsgs] = useState([]);
//   //responsive mobile
//   const [isRightVisible, setIsRightVisible] = useState(false);
//   const [isMenu, setIsMenu] = useState(false);
//   const user1 = currentUser.uid;
//   //klik luar keluar
//   const menuRef = useRef(null);

//   useEffect(() => {
//     if (currentUser) {
//       const userRef = collection(db, "users");
//       const q = query(userRef, where("uid", "not-in", [user1]));
//       const unsub = onSnapshot(q, (querySnapshot) => {
//         const userList = querySnapshot.docs.map((doc) => doc.data());
//         setUsers(userList);
//       });
//       return () => unsub();
//     }
//   }, [currentUser, user1]);

//   //effect ref
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         // Jika klik di luar "menu samping"
//         setIsMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   //upload file ke storage
//   const uploadFile = async (file, user1, user2) => {
//     if (!file) {
//       console.error("No file provided");
//       return null;
//     }
//     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
//     const storageRef = ref(storage, `${id}/${file.name}`);

//     try {
//       const snapshot = await uploadBytes(storageRef, file);
//       const url = await getDownloadURL(snapshot.ref);
//       return url;
//     } catch (error) {
//       console.error("Upload failed", error);
//       throw error;
//     }
//   };

//   const selectUser = async (user) => {
//     if (user) {
//       setChat(user);
//       const user2 = user.uid;
//       const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

//       // // Mark messages as read when user selects the conversation
//       // await updateDoc(doc(db, "lastMsg", id), { unread: false });

//       const msgRef = collection(db, "messages", id, "chat");
//       const q = query(msgRef, orderBy("createdAt", "asc"));
//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         let messages = [];
//         querySnapshot.forEach((doc) => {
//           messages.push(doc.data());
//         });
//         setMsgs(messages);
//       });

//       setIsRightVisible(true);

//       return () => unsubscribe();
//     } else {
//       console.log("user data is undefined");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (chat) {
//       const user2 = chat.uid;
//       const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

//       let fileUrl = null;
//       if (file || text) {
//         if (file) {
//           fileUrl = await uploadFile(file, user1, user2); // Kirim file jika ada
//         }

//         await addDoc(collection(db, "messages", id, "chat"), {
//           text,
//           from: user1,
//           to: user2,
//           createdAt: Timestamp.fromDate(new Date()),
//           fileUrl: fileUrl || null,
//         });
//         console.log("File in state:", file); // Cek file di state
//         console.log("File being uploaded:", file?.name); // Cek file sebelum di-upload
//         setText("");
//         setFile(null); // Reset file input
//       }
//     }
//   };

//   //delete messeges
//   const deleteMessage = async (id,text) => {
//     console.log("id",id,"chatId",text)
//     if(!id && !chatId) return
//     await deleteDoc(doc(db, "messages", id, "chat", chatId));
//   };

//   //edit messeges
//   const editMessage = async (id, chatId, newText) => {
//     await updateDoc(doc(db, "messages", chatId, "chat", id), { text: newText });
//   };

//   return (
//     <>
//       <div className="induk flex relative">
//         <Navbar />
//         {/* menu samping absolute*/}
//         <div
//           ref={menuRef}
//           className={`${!isMenu ? "-left-[135px] bg-slate-100 border-r-2 border-slate-400" : "left-0"} menu_samping z-10 absolute top-0 w-52 bg-slate-500 h-[99vh]  flex flex-col justify-between p-3 pt-[85px] transition-all`}
//         >
//           <div className="atas  flex flex-col ">
//             <span className="w-[40px] h-10 hover:bg-slate-300/50 flex items-center mb-6"></span>
//             <span
//               className="w-full h-10 hover:bg-slate-400/50 flex items-center cursor-pointer pl-14"
//               alt="Chat"
//               onClick={() => setIsRightVisible(false)}
//             >
//               Chat
//             </span>
//           </div>
//           <div className="bawah ">
//             <span className="w-full h-10 hover:bg-slate-300/50 cursor-pointer flex items-center mb-6 pl-14">
//               Profile
//             </span>
//           </div>
//         </div>
//         {/* logo */}
//         <div className="logo z-10 relative left-0 top-0 w-20  h-[99vh] flex flex-col justify-between p-3 pr-5 pt-[85px] pb-10 transition-all">
//           <div className="w-full h-full">
//             {/* This span is now the topmost layer */}
//             <span className="w-full h-10 hover:bg-slate-300/50 flex items-center mb-6 z-30 relative">
//               <IoMenu
//                 className={`z-30 ${isMenu ? "stroke-white" : "stroke-slate-700"} cursor-pointer text-4xl pl-3`}
//                 onClick={() => setIsMenu(true)}
//               />
//             </span>
//             <span className="w-full h-10 hover:bg-slate-300/50 flex items-center z-30 relative">
//               <FiMessageSquare
//                 className={`z-30 text-white text-4xl cursor-pointer mr-3 ${isMenu ? "stroke-white" : "stroke-slate-400"} pl-3 `}
//                 onClick={() => setIsRightVisible(false)}
//               />
//             </span>
//           </div>
//           <div className="gambar w-full h-auto relative">
//             <div className="z-20 w-10 h-10 pl-0.5">
//               {/* Foto Profil */}
//               {user && user.photoURL ? (
//                 <img
//                   src={user.photoURL}
//                   alt="avatar"
//                   className="avatar mr-2 size-16 rounded-full border border-slate-400 object-cover"
//                 />
//               ) : (
//                 <div className="avatar mr-2 size-16 flex items-center justify-center rounded-full bg-slate-500 text-white font-bold">
//                   {user?.displayName?.charAt(0).toUpperCase() || "U"}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* halaman chat */}
//         <div className="absolute z-0 top-0 left-16 home_container pt-16 flex w-[85vw] sm:w-[94.6vw] h-[99vh] text-black ">
//           {/* left side: User list */}
//           <div
//             className={`${
//               isRightVisible ? "hidden" : "block"
//             } users_container w-full sm:w-[40%] h-auto border-r-2 border-slate-400 overflow-y-auto sm:block ml-5 `}
//           >
//             {users.map((user, msg) => (
//               <User
//                 key={user.uid}
//                 user={user}
//                 selectUser={selectUser}
//                 user1={user1}
//                 chat={chat}
//               />
//             ))}
//           </div>

//           <div
//             className={`${
//               isRightVisible ? "block" : "hidden"
//             } messages_container h-[89vh] w-full p-2 sm:block sm:w-[50%] md:w-[60%] relative`}
//           >
//             {chat ? (
//               <>
//                 <div className="messages_user flex pb-3 pt-1 text-xl font-semibold border-b-2 border-slate-400">
//                   <div className="back_button sm:hidden pl-2">
//                     <button
//                       onClick={() => setIsRightVisible(false)}
//                       className=" px-4 py-2 hover:bg-slate-400/50 rounded"
//                     >
//                       <IoChevronBack className="stroke-black text-xl" />
//                     </button>
//                   </div>
//                   <div className="flex items-center ml-2 w text-xl font-semibold ">
//                     <h3>{chat.name}</h3>
//                   </div>
//                 </div>
//                 <div className="messages h-[70vh] overflow-y-auto border-b-2 border-slate-400 bg-wa">
//                   {msgs.length ? (
//                     msgs.map((msg, i) => (
//                       <Message
//                         key={i}
//                         msg={msg}
//                         user1={user1}

//                         editMessage={editMessage}
//                       />
//                     ))
//                   ) : (
//                     <p className="flex justify-center text-xl font-semibold text-slate-600">
//                       No messages
//                     </p>
//                   )}
//                 </div>
//                 <MessageForm
//                   handleSubmit={handleSubmit}
//                   text={text}
//                   uploadFile={uploadFile}
//                   setText={setText}
//                   file={file}
//                   setFile={setFile}
//                   className="absolute bottom-0"
//                 />
//               </>
//             ) : (
//               <h3 className="flex justify-center text-xl text-slate-600 font-semibold mt-5">
//                 Select a user to start a conversation
//               </h3>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
//=======================
//ditamabahi id, mengatur handledelete
//=======================
// import React, { useEffect, useState, useContext, useRef } from "react";
// import { db, auth } from "../firebase";
// import {
//   collection,
//   query,
//   onSnapshot,
//   where,
//   addDoc,
//   Timestamp,
//   orderBy,
//   setDoc,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import User from "../components/User_2_a";
// import MessageForm from "../components/MessageForm";
// import Message from "../components/Messages_2";
// import { AuthContext } from "../context/auth_2";
// import { FiMessageSquare } from "react-icons/fi";
// import Navbar from "../components/Navbar_3";
// import { IoChevronBack, IoMenu } from "react-icons/io5";
// import gambar_1 from "../assets/profile.png";
// import { storage } from "../firebase2";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import Profile from "./Profile_2";

// const Home = () => {
//   const { user, userProfile } = useContext(AuthContext); // mengambil data user dari AuthContext
//   const { user: currentUser } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [chat, setChat] = useState(null);
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [msgs, setMsgs] = useState([]);
//   //responsive mobile
//   const [isRightVisible, setIsRightVisible] = useState(false);
//   const [isMenu, setIsMenu] = useState(false);
//   const [profile, setIsProfile] = useState(true);
//   const user1 = currentUser.uid;
//   const user2 = user.uid;
//   const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
//   //klik luar keluar
//   const menuRef = useRef(null);
//   useEffect(() => {
//     if (currentUser) {
//       const userRef = collection(db, "users");
//       const q = query(userRef, where("uid", "not-in", [user1]));
//       const unsub = onSnapshot(q, (querySnapshot) => {
//         const userList = querySnapshot.docs.map((doc) => doc.data());
//         setUsers(userList);
//       });
//       return () => unsub();
//     }
//   }, [currentUser, user1]);

//   //effect ref
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         // Jika klik di luar "menu samping"
//         setIsMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   //upload file ke storage
//   const uploadFile = async (file, user1, user2) => {
//     if (!file) {
//       console.error("No file provided");
//       return null;
//     }
//     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
//     const storageRef = ref(storage, `${id}/${file.name}`);

//     try {
//       const snapshot = await uploadBytes(storageRef, file);
//       const url = await getDownloadURL(snapshot.ref);
//       return url;
//     } catch (error) {
//       console.error("Upload failed", error);
//       throw error;
//     }
//   };

//   const selectUser = async (user) => {
//     if (user) {
//       setChat(user);
//       const user2 = user.uid;
//       const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

//       // // Mark messages as read when user selects the conversation
//       // await updateDoc(doc(db, "lastMsg", id), { unread: false });

//       const msgRef = collection(db, "messages", id, "chat");
//       const q = query(msgRef, orderBy("createdAt", "asc"));
//       const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         let messages = [];
//         querySnapshot.forEach((doc) => {
//           messages.push(doc.data());
//         });
//         setMsgs(messages);
//       });

//       setIsRightVisible(true);

//       return () => unsubscribe();
//     } else {
//       console.log("user data is undefined");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (chat) {
//       const user2 = chat.uid;
//       const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

//       let fileUrl = null;
//       if (file || text) {
//         if (file) {
//           fileUrl = await uploadFile(file, user1, user2); // Kirim file jika ada
//         }

//         const docRef = await addDoc(collection(db, "messages", id, "chat"), {
//           text,
//           from: user1,
//           to: user2,
//           createdAt: Timestamp.fromDate(new Date()),
//           fileUrl: fileUrl || null,
//         });

//         //messageId(id dokumen)
//         const messageId = docRef.id;
//         console.log("messageIdndekSend", messageId);
//         console.log("File in state:", file); // Cek file di state
//         console.log("File being uploaded:", file?.name); // Cek file sebelum di-upload
//         setText("");
//         setFile(null); // Reset file input
//       }
//     }
//   };

//   // Fungsi untuk menghapus pesan
//   const deleteMessage = async (id, messageId) => {
//   console.log("deleteMessage ",id,messageId)
//     if (!id || !messageId) return;
//     try {
//       await deleteDoc(doc(db, "messages", id, "chat", messageId));
//       console.log("Message deleted successfully");
//     } catch (error) {
//       console.error("Error deleting message:", error);
//     }
//   };

//   // Fungsi untuk mengedit pesan
//   const editMessage = async (id, messageId, newText) => {
//   console.log("editMessage ",id,messageId,newText)
//     if (!id || !messageId || !newText) return;
//     try {
//       const messageRef = doc(db, "messages", id, "chat", messageId);
//       await updateDoc(messageRef, {
//         text: newText,
//         editedAt: Timestamp.fromDate(new Date()), // Tambahkan waktu terakhir di-edit
//       });
//       console.log("Message edited successfully");
//     } catch (error) {
//       console.error("Error editing message:", error);
//     }
//   };

//   const removeFile = () => {
//     setFile(null);
//   };

//   return (
//     <>
//       <div className="induk flex relative bg-biru">
//         <Navbar />
//         {/* menu samping absolute*/}
//         <div
//           ref={menuRef}
//           className={`${!isMenu ? "-translate-x-[132px]" : "translate-x-2"} inset-0 menu_samping z-10 absolute  w-52 bg-biru h-[99vh]  flex flex-col justify-between p-3 pt-[85px] transition-all`}
//         >
//           <div className="atas  flex flex-col ">
//             <span className="w-[40px] h-10 rounded hover:bg-slate-300/50 flex items-center mb-6"></span>
//             <span
//               className="w-full h-10 rounded hover:bg-slate-300/50 flex items-center cursor-pointer pl-14"
//               alt="Chat"
//               onClick={() => setIsRightVisible(false)}
//             >
//               Chat
//             </span>
//           </div>
//           <div className="bawah ">
//             <span className="w-full h-12 rounded hover:bg-slate-300/50 cursor-pointer flex items-center mb-7 pl-14">
//               Profile
//             </span>
//           </div>
//         </div>
//         {/* profile */}
//         <div
//           className={`${profile ? "hidden" : "block"} z-20 transition-all duration-700 absolute left-16 bottom-14 profile w-auto p-4 bg-slate-100 border border-biru rounded-md shadow-lg shadow-slate-200`}
//         >
//           <Profile />
//         </div>
//         {/* logo */}
//         <div className="logo z-10 relative left-0 top-0 w-[75px]  h-[99vh] flex flex-col justify-between p-3 pr-5 pt-[85px] pb-10 transition-all">
//           <div className="w-full h-full">
//             {/* This span is now the topmost layer */}
//             <span className="  flex items-center mb-6 z-30 relative">
//               <IoMenu
//                 className={`z-30 size-10 or-pointer text-4xl rounded  hover:bg-slate-300/50 p-3`}
//                 onClick={() => setIsMenu(true)}
//               />
//             </span>
//             <span className="w-full h-10 hover:bg-slate-300/50 rounded flex items-center z-30 relative">
//               <FiMessageSquare
//                 className={`z-30 text-white text-4xl cursor-default mr-3  pl-3 `}
//                 onClick={() => setIsRightVisible(false)}
//               />
//             </span>
//           </div>
//           <div
//             className="gambar h-auto relative cursor-default"
//             onClick={() => setIsProfile(!profile)}
//           >
//             <div className="z-20  size-12 pl-0.5">
//               {/* Foto Profil */}
//               {user && user.photoURL ? (
//                 <img
//                   src={user.photoURL}
//                   alt="avatar"
//                   className="avatar size-full mr-2 rounded-full border border-slate-400 object-cover"
//                 />
//               ) : (
//                 <div className="avatar size-12  mr-2  flex items-center justify-center rounded-full bg-slate-500 text-white font-bold">
//                   {user?.displayName?.charAt(0).toUpperCase() || "U"}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* halaman chat */}
//         <div className="absolute z-0 top-0 left-16 home_container pt-16 flex w-[85vw] sm:w-[94.6vw] h-[99vh] text-black ">
//           {/* left side: User list */}
//           <div
//             className={`${
//               isRightVisible ? "hidden" : "block"
//             } users_container w-full sm:w-[40%] h-auto border-r-4 border-biru bg-white rounded-tl-xl overflow-y-auto sm:block ml-3 pt-3`}
//           >
//             {users.map((user, msg) => (
//               <User
//                 key={user.uid}
//                 user={user}
//                 selectUser={selectUser}
//                 user1={user1}
//                 chat={chat}
//               />
//             ))}
//           </div>

//           <div
//             className={`${
//               isRightVisible ? "block" : "hidden"
//             } messages_container h-[89vh] w-full p-2 sm:block sm:w-[50%] md:w-[60%] bg-white relative`}
//           >
//             {chat ? (
//               <>
//                 <div className="messages_user flex pb-3 pt-1 text-xl font-semibold border-b-2 border-slate-400">
//                   <div className="back_button sm:hidden pl-2">
//                     <button
//                       onClick={() => setIsRightVisible(false)}
//                       className=" px-4 py-2 hover:bg-slate-400/50 rounded"
//                     >
//                       <IoChevronBack className="stroke-black text-xl" />
//                     </button>
//                   </div>
//                   <div className="flex items-center ml-2 w text-xl font-semibold ">
//                     <h3>{chat.name}</h3>
//                   </div>
//                 </div>
//                 <div className="messages h-[70vh] overflow-y-auto border-b-2 border-slate-400 bg-wa">
//                   {msgs.length ? (
//                     msgs.map((msg, i) => (
//                       <Message
//                         key={i}
//                         msg={msg}
//                         user1={user1}
//                         handleDelete={() => deleteMessage(id, msg.id)} //id dan messageId harus di pass
//                         editMessage={(newText) =>
//                           editMessage(id, msg.id, newText)
//                         } //ditambahi newText
//                       />
//                     ))
//                   ) : (
//                     <p className="flex justify-center text-xl font-semibold text-slate-600">
//                       No messages
//                     </p>
//                   )}
//                 </div>
//                 <MessageForm
//                   handleSubmit={handleSubmit}
//                   text={text}
//                   uploadFile={uploadFile}
//                   setText={setText}
//                   file={file}
//                   setFile={setFile}
//                   removeFile={removeFile}
//                   className="absolute bottom-0"
//                 />
//               </>
//             ) : (
//               <h3 className=" text-center text-xl text-slate-600 font-semibold mt-5">
//                 Select a user to start a conversation
//               </h3>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
//================================
//setelah mengatur delete dari gpt
//==========================
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
  getDoc,
  limit,
  getDocs,
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
import { CgProfile } from "react-icons/cg";

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
  const [profile2, setIsProfile2] = useState(true);
  const user1 = currentUser.uid;
  const user2 = user.uid;
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
  //klik luar keluar
  const menuRef = useRef(null);
  // useEffect(() => {
  //   if (currentUser) {
  //     const userRef = collection(db, "users");
  //     const q = query(userRef, where("uid", "not-in", [user1]));
  //     const unsub = onSnapshot(q, (querySnapshot) => {
  //       // const userList = querySnapshot.docs.map((doc) => doc.data());
  //       const userList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  //       setUsers(userList);
  //     });
  //     return () => unsub();
  //   }
  // }, [currentUser, user1]);

  //effect ref
  //setelah menambahkan lastmessage

  useEffect(() => {
    if (currentUser) {
      const userRef = collection(db, "users");
      const q = query(userRef, where("uid", "not-in", [user1]));

      const unsub = onSnapshot(q, (querySnapshot) => {
        const promises = querySnapshot.docs.map(async (doc) => {
          const userData = { id: doc.id, ...doc.data() };
          const chatId =
            user1 > userData.uid
              ? `${user1 + userData.uid}`
              : `${userData.uid + user1}`;
          const msgRef = collection(db, "messages", chatId, "chat");

          // Listener real-time untuk pesan terakhir
          const lastMsgUnsub = onSnapshot(
            query(msgRef, orderBy("createdAt", "desc"), limit(1)),
            (snapshot) => {
              const lastMsgData = snapshot.docs[0]?.data();
              const lastMsg = lastMsgData?.text || "no Message" || "File Sent";
              const lastMsgTime = lastMsgData?.createdAt?.toDate() || null;
              setUsers((prev) =>
                prev.map((user) =>
                  user.uid === userData.uid ? { ...user, lastMsg, lastMsgTime } : user
                )
              );
            }
          );

          // Simpan referensi unsubscribe jika diperlukan
          return { ...userData, lastMsgUnsub };
        });

        Promise.all(promises).then((userList) => setUsers(userList));
      });

      return () => unsub(); // Bersihkan listener Firestore
    }
  }, [currentUser, user1]);

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

  // const selectUser = async (user) => {
  //   if (user) {
  //     setChat(user);
  //     const user2 = user.uid;
  //     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  //     // // Mark messages as read when user selects the conversation
  //     // await updateDoc(doc(db, "lastMsg", id), { unread: false });

  //     const msgRef = collection(db, "messages", id, "chat");
  //     const q = query(msgRef, orderBy("createdAt", "asc"));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       let messages = [];
  //       querySnapshot.forEach((doc) => {
  //         messages.push({ ...doc.data(), id: doc.id }); // Menambahkan id dokumen Firestore
  //       });
  //       setMsgs(messages);
  //     });

  //     setIsRightVisible(true);

  //     return () => unsubscribe();
  //   } else {
  //     console.log("user data is undefined");
  //   }
  // };
  //setelah gpt

  const selectUser = async (user) => {
    if (!user) return;

    setChat(user);
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgRef = collection(db, "messages", id, "chat");
    const q = query(msgRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Tambahkan id dokumen untuk pengelolaan UI
      }));
      setMsgs(messages);
    });

    setIsRightVisible(true);

    // Pastikan listener sebelumnya dihentikan
    return () => unsubscribe();
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

        const docRef = await addDoc(collection(db, "messages", id, "chat"), {
          text,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          fileUrl: fileUrl || null,
        });

        //messageId(id dokumen)
        const messageId = docRef.id;
        console.log("messageIdndekSend", messageId);
        console.log("File in state:", file); // Cek file di state
        console.log("File being uploaded:", file?.name); // Cek file sebelum di-upload
        setText("");
        setFile(null); // Reset file input
      }
    }
  };

  // Fungsi untuk menghapus pesan
  // const deleteMessage = async (id, messageId) => {
  //   console.log("deleteMessage ", id, messageId);
  //   if (!id || !messageId) return;
  //   try {
  //     await deleteDoc(doc(db, "messages", id, "chat", messageId));
  //     // Update state msgs untuk menghapus pesan dari UI
  //     setMsgs((prevMsgs) => prevMsgs.filter((msg) => msg.id !== messageId));
  //     console.log("Message deleted successfully");
  //   } catch (error) {
  //     console.error("Error deleting message:", error);
  //   }
  // };
  //setelah gpt
  const deleteMessage = async (messageId) => {
    if (!messageId) return;

    try {
      const user2 = chat?.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      const msgDocRef = doc(db, "messages", id, "chat", messageId);

      await deleteDoc(msgDocRef);
      console.log(`Message ${messageId} deleted`);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Fungsi untuk mengedit pesan
  // const editMessage = async (id, messageId, newText) => {
  //   console.log("editMessage ", id, messageId,"n ",newText);
  //   if (!id || !messageId || !newText) return;
  //   try {
  //     //referensi
  //     const messageRef = doc(db, "messages", id, "chat", messageId);
  //     console.log("messageRef:",messageRef.path)
  //     //dokumen kudu ada sek
  //     const messageDoc = await getDoc(messageRef);
  //     if (!messageDoc.exists()) {
  //       console.error("messageRef not such");
  //       return;
  //     }
  //     //baru diupdate
  //     await updateDoc(messageRef, {
  //       text: newText,
  //       editedAt: Timestamp.fromDate(new Date()), // Tambahkan waktu terakhir di-edit
  //     });
  //     console.log("Message edited successfully");

  //      // Update the UI to reflect the edited message
  //   setMsgs((prevMsgs) =>
  //     prevMsgs.map((msg) =>
  //       msg.id === messageId ? { ...msg, text: newText, editedAt: new Date() } : msg
  //     )
  //   );

  //   } catch (error) {
  //     console.error("Error editing message:", error);
  //   }
  // };
  //setelah gpt
  const updateMessage = async (messageId, updatedText) => {
    if (!messageId || !updatedText) return;

    try {
      const user2 = chat?.uid;
      const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
      const msgDocRef = doc(db, "messages", id, "chat", messageId);

      await updateDoc(msgDocRef, { text: updatedText });
      console.log(`Message ${messageId} updated to: ${updatedText}`);
    } catch (error) {
      console.error("Error updating message:", error);
    }
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
                  <div className="flex bg-green-300 items-center ml-2 w text-xl font-semibold ">
                    {/* //poto profile */}
                    <div
                      className="wadah-profile"
                      onClick={() => setIsProfile2(!isProfile2)}
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="avatar mr-2 size-10 rounded-full border border-slate-400"
                        />
                      ) : (
                        // awalan huruf besar
                        <div className="avatar mr-2 size-10 flex items-center justify-center rounded-full bg-blue-400 text-white font-semibold text-3xl">
                          {user.name ? (
                            user.name?.charAt(0).toUpperCase()
                          ) : (
                            <CgProfile className="size-10" />
                          )}
                        </div>
                      )}
                    </div>
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
                        handleDelete={() => deleteMessage(id, msg.id)} //id dan messageId harus di pass
                        updateMessage={(updatedText) =>
                          updateMessage(id, msg.id, newText)
                        } //ditambahi newText
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
