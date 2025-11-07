import React, { useState } from "react";

const CreateChatRoom = ({ onCreate }) => {
  const [roomName, setRoomName] = useState("");

  const handleCreate = () => {
    if (roomName.trim()) {
      onCreate(roomName.trim());
      setRoomName("");
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Tên phòng chat mới..."
        className="w-full px-3 py-2 border rounded-lg mb-2"
      />
      <button
        onClick={handleCreate}
        className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Tạo phòng chat
      </button>
    </div>
  );
};

export default CreateChatRoom;
