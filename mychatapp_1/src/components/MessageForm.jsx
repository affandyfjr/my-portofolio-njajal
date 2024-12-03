import React, { useState } from "react";
import { IoMdAttach, IoMdSend } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";

const MessageForm = ({
  handleSubmit,
  text,
  setText,
  className,
  removeFile,
  file,
  setFile,
}) => {
  console.log("file is", file);
  return (
    <form
      className={`message_form bg-biru w-full flex flex-col h gap-3 justify-between p-2 ${className}`}
      onSubmit={handleSubmit}
    >
      {/* file input */}
      {file && (
        <div className="flex items-center bg-blue-200/50 p-1 mr-12 rounded-md gap-2 ">
          <button onClick={removeFile} className=" hover:bg-slate-200/50 mr-2 p-2 hover:underline rounded">
          <RiDeleteBin5Fill className="fill-red-500" />
          </button>
          <span className="text-sm text-white border-l-4 pl-2 border-white">{file.name}</span>
          
        </div>
      )}
      <div className="flex  w-full">
        <input
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) setFile(selectedFile);
          }}
          accept="image/*,application/pdf"
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="mr-2 cursor-pointer">
          <IoMdAttach className="fill-white size-10 hover:bg-slate-200/50 rounded-md p-2" />
        </label>
        <input
          type="text"
          placeholder="Enter message"
          className="flex-1 rounded-lg px-3 py-2 text-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>
          <IoMdSend className="fill-white size-10 hover:bg-slate-200/50 p-2 ml-2 rounded-md " />
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
