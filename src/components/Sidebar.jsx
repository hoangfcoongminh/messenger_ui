import React from "react";

const Sidebar = ({ children }) => {
  return (
    <div className="w-72 bg-white shadow-lg h-screen flex flex-col p-4 border-r">
      {children}
    </div>
  );
};

export default Sidebar;
