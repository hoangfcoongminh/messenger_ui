import React from "react";

const ChatRoom = ({ room, children }) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="border-b pb-2 mb-2">
        <h2 className="text-xl font-bold text-blue-700">
          {room ? room.name : "Chọn phòng chat"}
        </h2>
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
};

export default ChatRoom;
