import React from "react";

const Komponen_scroll_1 = ({bg_logo,logo,atas,bawah}) => {
  return (
    <div className="a flex items-center">
      <button className={`kiri rounded-full mr-2 flex items-center justify-center py-4 px-2 ${bg_logo}`}>
        {logo}
      </button>
      <div className="flex flex-col">
        <h5 className="text-sm text-[10px] md:text-xs lg:text-sm xl:text-lg font-semibold">
         {atas}
        </h5>
        <p className=" text-[10px]  lg:text-xs xl:text-base">{bawah}</p>
      </div>
    </div>
  );
};

export default Komponen_scroll_1;
