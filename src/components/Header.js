import React from "react";

const Header = () => {
  return (
    <div className="bg-gradient-to-b to-green-900 from-black h-16 px-4 flex justify-between items-center border-b border-gray-900 mb-10">
      <span className="ml-5 text-white">React-dropzone Activity</span>
      <div className="relative mr-5">
        <span className="">By: Mark Christian Velasco</span>
      </div>
    </div>
  );
};

export default Header;
