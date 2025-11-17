import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import SearchUser from "../components/SearchUser.jsx";
import ChatRoomList from "../components/ChatRoomList.jsx";
import ChatComponent from "../components/ChatComponent.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import "react-toastify/dist/ReactToastify.css";

function Messenger() {
  const [selected, setSelected] = useState(null);
  const [fullName, setFullName] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [type, setType] = useState(null);

  useEffect(() => {
    // Lấy fullName từ localStorage khi app khởi động
    const fullName = localStorage.getItem("fullName");
    if (fullName) {
      setFullName(fullName);
    }
  }, []);

  const handleLogin = (name) => {
    setFullName(name);
    localStorage.setItem("fullName", name);
    setShowSignup(false);
  };

  const handleSignup = (name) => {
    setFullName(name);
    localStorage.setItem("fullName", name);
    setShowSignup(false);
  };

  const handleShowSignup = () => setShowSignup(true);
  const handleShowLogin = () => setShowSignup(false);

  const handleSelectedChat = (type, targetId) => {
    setSelected(targetId);
    setType(type);
  };

  const handleLogout = () => {
    localStorage.removeItem("fullName");
    localStorage.removeItem("uid");
    setFullName("");
    setSelected(null);
  };

  if (!fullName) {
    return showSignup ? (
      <Signup onSignup={handleSignup} onShowLogin={handleShowLogin} />
    ) : (
      <Login onLogin={handleLogin} onShowSignup={handleShowSignup} />
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar>
        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold text-blue-700">
            Xin chào, {fullName}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
          >
            Đăng xuất
          </button>
        </div>
        <SearchUser />
        <ChatRoomList
          onSelectRoom={handleSelectedChat}
          selectedRoomId={selected}
        />
      </Sidebar>
      <main className="flex-1 flex flex-col">
        {/* <ChatRoom room={selectedRoom}> */}
        {/* TODO: Truyền roomId vào ChatComponent để chat theo phòng */}
        <ChatComponent roomId={selected} />
        {/* </ChatRoom> */}
      </main>
    </div>
  );
}

export default Messenger;
