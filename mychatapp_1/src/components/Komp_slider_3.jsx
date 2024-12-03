import React from "react";

const Komp_slider_3 = ({logo_3,atas_3,bawah_3,bg_logo_3}) => {
  return (
    <div className="1 relative group">
      <div className=" relative z-10 h-[30%] md:h-[25%] bg-white rounded-md flex items-center p-3">
        <p className={`logo p-2 rounded-full ${bg_logo_3} flex justify-center items-center mr-3`}>
         {logo_3}
        </p>
        <div className="b flex flex-col space-y-1 w-[70%]">
          <h2 className="text-xs xl:text-base font-semibold">{atas_3}</h2>
          <p className="text-[10px] xl:text-sm">
            {bawah_3}
          </p>
        </div>
      </div>
      {/* effect */}
      <div className="absolute -top-1 -left-1 z-0 hidden group-hover:block h-[110%] w-[100%]  rounded-lg bg-gradient-to-r from-blue-500 via-blue-300 to-transparent p-1 group"></div>
    </div>
  );
};

export default Komp_slider_3;
