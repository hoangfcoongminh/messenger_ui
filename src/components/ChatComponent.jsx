import React, { useState, useEffect } from "react";
import { connect, sendMessage, disconnect } from "../websocket/chat";
import { toast } from "react-toastify";
import chatMessageApi from "../api/chatMessage";
import userApi from "../api/userApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CONNECT_TYPE } from "../enum/connectType";

dayjs.extend(relativeTime);

const ChatComponent = ({ type, targetId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const messagesEndRef = React.useRef(null);

  // Khởi tạo kết nối WebSocket khi component mount
  useEffect(() => {
    const fetchHistoryMessages = async (type, targetId) => {
      try {
        const response = await chatMessageApi.fetchHistoryMessages(
          type,
          targetId
        );
        setMessages(response.data);
        const userInGroup = response.data.reduce((acc, msg) => {
          if (!acc.includes(msg.sender)) {
            acc.push(msg.sender);
          }
          return acc;
        }, []);
        if (userInGroup.length) {
          fetchUsersInGroup(userInGroup);
        }
      } catch (error) {
        toast.error("Lỗi khi tải lịch sử tin nhắn");
        console.error("Lỗi khi tải lịch sử tin nhắn: ", error);
      }
    };

    fetchHistoryMessages(type, targetId);

    connect(targetId, (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Ngắt kết nối khi component unmount
    return () => {
      disconnect();
    };
  }, [type, targetId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const fetchUsersInGroup = (userIds) => {
    userApi
      .getUsers({ ids: userIds })
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        toast.error("Lỗi khi tải danh sách người dùng");
        console.error("Lỗi khi tải danh sách người dùng: ", error);
      });
  };

  const handleSendMessage = () => {
    userList.length > 1
      ? sendMessage(CONNECT_TYPE.GROUP, targetId, message)
      : sendMessage(CONNECT_TYPE.USER, targetId, message);

    setMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          WebSocket Chat
        </h2>
        <div className="flex flex-col h-[32rem] border rounded-lg bg-gray-50 p-6 mb-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-gray-400 text-center my-auto">
              Chưa có tin nhắn nào
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMine = msg.sender === localStorage.getItem("uid");
              return (
                <div
                  key={index}
                  className={`mb-2 flex ${
                    isMine ? "justify-end" : "justify-start"
                  }`}
                >
                  {isMine && (
                    <span
                      className="mr-2 text-[0.65rem] text-gray-500 self-end"
                      title={dayjs(msg.timestamp).format("HH:mm DD/MM/YYYY")}
                    >
                      {dayjs(msg.timestamp).fromNow()}
                    </span>
                  )}
                  <div
                    className={`px-3 py-2 rounded-lg shadow-sm max-w-xs ${
                      isMine
                        ? "bg-purple-600 text-white"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    <div className="text-xs font-semibold mb-1">
                      {isMine
                        ? "Bạn"
                        : userList.filter((user) => user.id === msg.sender)[0]
                            ?.fullName}
                    </div>
                    <div className="text-left">{msg.message}</div>
                  </div>
                  {!isMine && (
                    <span
                      className="ml-2 text-[0.65rem] text-gray-500 self-end"
                      title={dayjs(msg.timestamp).format("HH:mm DD/MM/YYYY")}
                    >
                      {dayjs(msg.timestamp).fromNow()}
                    </span>
                  )}
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
