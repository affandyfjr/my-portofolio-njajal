import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

// const Messages = ({ msg, user1, deleteMessage, editMessage }) => {
//   const isSender = msg.from === user1;
//   const scrollRef = useRef();
//   // const date = msg.createdAt.toDate();
//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [msg]);
//   // tanggal seperti wa
//   // function formatRelativeTime(timestamp) {
//   //   if (timestamp && typeof timestamp.toDate === "function") {
//   //     const date = timestamp.toDate();
//   //     const now = new Date();
//   //     const diffInSeconds = Math.floor((now - date) / 1000);

//   //     // Define time intervals
//   //     const seconds = diffInSeconds;
//   //     const minutes = Math.floor(seconds / 60);
//   //     const hours = Math.floor(minutes / 60);
//   //     const days = Math.floor(hours / 24);

//   //     if (seconds < 60) return "Now";
//   //     if (minutes < 60) return `${minutes} min ago`;
//   //     if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   //     if (days === 1) return "Yesterday";
//   //     if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
//   //     return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`; // Default full date
//   //   }
//   //   return ""; // Return empty string if timestamp is invalid
//   // }
//   function formatRelativeTime(timestamp) {
//     if (!timestamp?.toDate) return "";
//     const date = timestamp.toDate();
//     const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
//     const diff = (Date.now() - date.getTime()) / 1000;

//     if (diff < 60) return "Now";
//     if (diff < 3600) return formatter.format(-Math.floor(diff / 60), "minutes");
//     if (diff < 86400) return formatter.format(-Math.floor(diff / 3600), "hours");
//     return date.toLocaleDateString();
//   }

//   return (
//     <div
//       className={`message_wrapper flex  ${msg.from === user1 ? "justify-end" : "justify-start"} `}
//       ref={scrollRef}
//     >
//       <p
//         className={`inline-block relative max-w-[50%] text-left rounded-md m-3 p-3 shadow-lg shadow-slate-300 ${msg.from === user1 ? "bg-blue-300 text-black" : "bg-white text-black"}`}
//       >
//         {msg.text && <span>{msg.text}</span>}
//         {msg.fileUrl && (
//           <a
//             href={msg.fileUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 underline"
//           >
//             View File
//           </a>
//         )}
//         <br />
//         <small className="text-slate-500 mt-2">
//           {formatRelativeTime(msg.createdAt)}
//         </small>
//       </p>
//       <button
//         onClick={() => deleteMessage(msg.id)}
//         className="p-1 bg-yellow-400 hover:bg-slate-300"
//       >
//         delete
//       </button>
//       <button
//         onClick={() => editMessage(msg.id)}
//         className="p-1 bg-yellow-400 hover:bg-slate-300"
//       >
//         edit
//       </button>
//     </div>
//   );
// };
const Messages = ({ msg, user1, editMessage, handleDelete }) => {
  const isSender = msg.from === user1;
  const scrollRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(msg.text);
  console.log("msg ndek komponent ", msg.id);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  // function formatRelativeTime(timestamp) {
  //   if (!timestamp?.toDate) return "";
  //   const date = timestamp.toDate();
  //   const diff = (Date.now() - date.getTime()) / 1000;
  //   if (diff < 60) return "Now";
  //   if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  //   if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  //   return date.toLocaleDateString();
  // }
  //setelah gpt
  function formatRelativeTime(timestamp) {
    if (!timestamp?.toDate) return "";

    const date = timestamp.toDate();
    const diff = (Date.now() - date.getTime()) / 1000; // Selisih dalam detik

    // Helper untuk format pukul sesuai default desktop
    const formatTime = (date) => {
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const isPM = hours >= 12;
      const formattedHours = isPM ? hours - 12 || 12 : hours;
      const ampm = isPM ? "PM" : "AM";
      return `${formattedHours}:${minutes} ${ampm}`;
    };

    // Format untuk "Now", "Yesterday", dst.
    if (diff < 60) return "Now";
    if (diff < 3600) return `${Math.floor(diff / 60)} m ago`;
    if (diff < 86400) return `${formatTime(date)}`;
    if (diff < 172800) return `Yesterday,${formatTime(date)}`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} d ago`;
    if (diff < 2592000) return `${Math.floor(diff / 604800)} w ago`;
    return date.toLocaleDateString(); // Untuk format tanggal penuh
  }

  const handleEdit = () => {
    if (newText.trim()) {
      editMessage(newText);
      setIsEditing(false); // keluar dari mode edit
    }
  };

  return (
    <div
      className={`message_wrapper flex ${isSender ? "justify-end" : "justify-start"}`}
      ref={scrollRef}
    >
      {/* {isEditing ? (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleEdit}
            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      ) : ( */}

      {/* {isSender && (
            <div className="hidden group-hover:block transition-all h-8 p-1 bg-slate-400 rounded-full">
              delete
              <button
                onClick={() => handleDelete(msg.id)}
                className="rounded-full hover:bg-slate-300"
              >
                <RiDeleteBin5Fill className="p-1 size-6 fill-white " />
              </button>
              edit
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full hover:bg-slate-300 "
              >
                <MdEdit className="p-1  size-6 fill-white " />
              </button>
            </div>
          )} */}
      <div
        className={` max-w-[70%] relative text-left rounded-md  m-3 p-3 min-w-[35%] lg:min-w-[20%] shadow-lg ${
          isSender
            ? "bg-blue-300 text-black rounded-tr-none"
            : "bg-white text-black rounded-tl-none"
        }`}
      >
        <div
          className={`${isSender ? "bg-blue-300 -top-2 -right-2" : "bg-white top-1 -left-2"} segitiga size-4 rotate-45 absolute `}
        ></div>
        <div
          className={`${isSender ? "bg-white -top-4 -right-3" : ""} penutup h-4 w-6 absolute `}
        ></div>
        <p className="text-black">
          {msg.fileUrl && (
            <div className="my-3 ">
              {msg.fileUrl.endsWith(".pdf") ? (
                <a
                  href={msg.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View PDF
                </a>
              ) : (
                <img
                  src={msg.fileUrl}
                  alt="Uploaded file"
                  className="max-w-full rounded-md shadow-md"
                />
              )}
            </div>
          )}
          {msg.text && <span>{msg.text}</span>}
        </p>
        <small
          className={`${isSender ? "text-slate-600" : "text-slate-400"} absolute right-2 bottom-2  text-[12px] ml-10`}
        >
          {formatRelativeTime(msg.createdAt)}
        </small>
      </div>
      {/* tombol delete dan edit */}

      {/* )} */}
    </div>
  );
};

export default Messages; // Exporting as default
