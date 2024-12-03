import React from "react";
import { IoMdStar } from "react-icons/io";
import { IoTriangleSharp } from "react-icons/io5";
import { MdChatBubble } from "react-icons/md";
import { TbCirclesRelation } from "react-icons/tb";

const GambarBelakang = () => {
  return (
    <div className="relative w-full h-screen bg-blue-200">
      {/*kiri*/}
      <div className="span absolute top-56 -left-2 size-20 ">
        <TbCirclesRelation className="size-full" />
      </div>
      <div className="span absolute -bottom-3 -left-3 -rotate-12 size-20 ">
        <IoTriangleSharp className="size-full" />
      </div>
      <div className="span absolute bottom-52 left-14 w-28 h-9 -rotate-6 bg-white "></div>
      <div className="span absolute top-52 left-40 -rotate-6 size-14 ">
        <MdChatBubble className="size-full " />
      </div>
      <div className="span absolute top-64 left-64 -rotate-12 size-20 ">
        <TbCirclesRelation className="size-full" />
      </div>
      <div className="span absolute bottom-20 left-72 -rotate-2 size-20 ">
        <IoTriangleSharp className="size-full" />
      </div>
      <div className="span absolute top-20 left-72 w-28 h-9 rotate-45 bg-white "></div>
      <div className="span absolute bottom-52 left-96 rotate-12 size-14 ">
        <MdChatBubble className="size-full " />
      </div>
      {/* kanan */}
      <div className="span absolute top-60 right-20 size-20 rotate-3 ">
        <MdChatBubble className="size-full " />
      </div>
      <div className="span absolute bottom-32 right-20 w-28 h-9 rotate-[10deg] bg-white "></div>
      <div className="span absolute -top-32 -left-32 size-72 bg-white rounded-full"></div>
      <div className="span absolute top-24 right-0 size-20 ">
        <IoMdStar className="size-full" />
      </div>
      <div className="span absolute top-0 right-44 rotate-6 size-20 ">
        <IoTriangleSharp className="size-full" />
      </div>
      {/* =========== */}
      <div className="span absolute top-10 right-96 size-20 -rotate-6 ">
        <MdChatBubble className="size-full " />
      </div>
      <div className="span absolute top-60 right-60 w-28 h-9 -rotate-45 bg-white "></div>
      <div className="span absolute bottom-40 right-72 -rotate-12 size-20 ">
        <TbCirclesRelation className="size-full" />
      </div>
      <div className="span absolute bottom-10 right-56 size-20 ">
        <IoMdStar className="size-full" />
      </div>
      <div className="span absolute bottom-0 right-96 -rotate-6 size-20 ">
        <IoTriangleSharp className="size-full" />
      </div>
    </div>
  );
};

export default GambarBelakang;
