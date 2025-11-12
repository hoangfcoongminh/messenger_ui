import React, { useEffect, useState } from "react";
import CreateChatRoomForm from "./CreateChatRoomForm";
import chatRoomApi from "../api/chatRoomApi";

const ChatRoomList = ({ onSelectRoom, selectedRoomId }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);

  useEffect(() => {
    const fetchChatRooms = () => {
      chatRoomApi
        .getChatRooms()
        .then((response) => {
          setChatRooms(response.data);
          if (response.data.length > 0 && !selectedRoomId) {
            onSelectRoom(response.data[0].id);
          }
        })
        .catch((error) => {
          console.error("Error fetching chat rooms:", error);
        });
    };

    fetchChatRooms();
  }, [onSelectRoom, selectedRoomId]);

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
