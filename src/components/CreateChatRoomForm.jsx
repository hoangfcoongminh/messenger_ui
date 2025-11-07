import React, { useState } from "react";

// Dummy user list (thay bằng API khi cần)
const DUMMY_USERS = [
  { id: "u1", name: "Minh Hoàng" },
  { id: "u2", name: "Lan Nguyễn" },
  { id: "u3", name: "Tuấn Anh" },
  { id: "u4", name: "Hà Phạm" },
];

const CreateChatRoomForm = ({ onCreate, onCancel }) => {
  const [roomName, setRoomName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleToggleMember = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomName.trim() && selectedMembers.length > 0) {
      onCreate({ name: roomName.trim(), members: selectedMembers });
      setRoomName("");
      setSelectedMembers([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm"
    >
      <h2 className="text-lg font-bold mb-4">Tạo phòng chat mới</h2>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Tên nhóm chat</label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập tên nhóm..."
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">Chọn thành viên</label>
        <div className="max-h-32 overflow-y-auto border rounded p-2 bg-gray-50">
          {DUMMY_USERS.map((user) => (
            <label
              key={user.id}
              className="flex items-center mb-1 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedMembers.includes(user.id)}
                onChange={() => handleToggleMember(user.id)}
                className="mr-2"
              />
              {user.name}
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Tạo phòng chat
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Hủy
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateChatRoomForm;
