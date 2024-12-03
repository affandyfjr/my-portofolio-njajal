import React, { useRef, useEffect } from "react";
// import Moment from 'react-moment';
// import Moment from "react-moment";

const Message = ({ msg, user1 }) => {
  //untuk gulir bawah
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  if (!msg)
    return (
      <div className="flex justify-center text-xl font-semibold text-slate-600">
        No message data available
      </div>
    );

  return (
    //untuk ketika userlogin pesan dari kanan
    <div
      className={`message_wrapper flex bg-yellow-500 ${msg.from === user1 ? "justify-end" : "justify-start"} `}
      ref={scrollRef}
    >
      <p
        className={`inline-block max-w-[50%] text-left rounded-md  p-2 ${msg.from === user1 ? "bg-slate-400 text-black" : "bg-slate-800"}`}
      >
        {msg.text}
        <br />
        {/* <small>
          <Moment fromNow>{msg.createdAt}</Moment>
        </small> */}
        {/* <small>
          {msg.createdAt ? (
            <Moment fromNow>{new Date(msg.createdAt.toMillis())}</Moment>
          ) : (
            "Time not available"
          )}
        </small> */}
      </p>
    </div>
  );
};

export default Message;

//===============
