import React, { useEffect, useState } from "react";
import CreateChatRoomForm from "./CreateChatRoomForm";
import chatRoomApi from "../api/chatRoomApi";
import ChatRoomType from "../enums/chatRoomType";

const ChatRoomList = ({ onSelectRoom, selectedRoom }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [type, setType] = useState("all");

  useEffect(() => {
    const fetchChatRooms = (typeValue) => {
      chatRoomApi
        .getChatRooms(typeValue === "all" ? null : typeValue)
        .then((response) => {
          setChatRooms(response.data);
          if (response.data.length > 0 && !selectedRoom) {
            onSelectRoom(response.data[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching chat rooms:", error);
        });
    };

    fetchChatRooms(type);
  }, [onSelectRoom, selectedRoom, type]);

  const handleCreateRoom = (roomData) => {
    chatRoomApi
      .createChatRoom(roomData)
      .then((response) => {
        const newRoom = response.data;
        setChatRooms((prev) => [...prev, newRoom]);
      })
      .catch((error) => {
        console.error("Error creating chat room:", error);
      });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Phòng chat của bạn</h3>
          <select
            className="px-2 py-1 border rounded-lg text-sm bg-white"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value={ChatRoomType.PRIVATE}>Bạn bè</option>
            <option value={ChatRoomType.GROUP}>Nhóm</option>
          </select>
        </div>
        {chatRooms.length === 0 ? (
          <div className="text-gray-400">Chưa có phòng chat nào</div>
        ) : (
          chatRooms.map((room) => (
            <div
              key={room.id}
              className={`p-2 border-2 border-black-300 rounded-lg cursor-pointer mb-2 hover:bg-blue-100 transition ${
                selectedRoom.id === room.id ? "bg-blue-200" : ""
              }`}
              onClick={() => onSelectRoom(room)}
            >
              <div className="font-medium">{room.name}</div>
            </div>
          ))
        )}
      </div>
      <div className="mt-4">
        <button
          className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
          onClick={() => setIsOpenCreateForm(true)}
        >
          Tạo phòng chat
        </button>
      </div>
      {isOpenCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setIsOpenCreateForm(false)}
            >
              ×
            </button>
            <CreateChatRoomForm
              onCreate={(roomData) => {
                handleCreateRoom(roomData);
                setIsOpenCreateForm(false);
              }}
              onCancel={() => setIsOpenCreateForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoomList;
