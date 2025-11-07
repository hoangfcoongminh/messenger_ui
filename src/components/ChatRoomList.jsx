import React from "react";

const ChatRoomList = ({ chatRooms, onSelectRoom, selectedRoomId }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">Phòng chat của bạn</h3>
      {chatRooms.length === 0 ? (
        <div className="text-gray-400">Chưa có phòng chat nào</div>
      ) : (
        chatRooms.map((room) => (
          <div
            key={room.id}
            className={`p-2 rounded-lg cursor-pointer mb-2 hover:bg-blue-100 transition ${
              selectedRoomId === room.id ? "bg-blue-200" : ""
            }`}
            onClick={() => onSelectRoom(room.id)}
          >
            <div className="font-medium">{room.name}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatRoomList;
