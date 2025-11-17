import { toast } from "react-toastify";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { CONNECT_TYPE } from "../enum/connectType.js";

let stompClient = null;

export const connect = (type, targetId, onMessageReceived) => {
  const socket = new SockJS("http://localhost:8080/ws");
  const connectType = type === CONNECT_TYPE.USER ? "user" : "group";
  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      stompClient.subscribe(`/topic/${connectType}/${targetId}`, (msg) => {
        const message = JSON.parse(msg.body);
        onMessageReceived(message);
      });
    },
    onStompError: (error) => {
      toast.error("WebSocket connection error", error);
    },
  });
  stompClient.activate();
};

export const sendMessage = (type, targetId, message) => {
  if (!stompClient || !stompClient.active) {
    return;
  }
  const connectType = type === CONNECT_TYPE.USER ? "user" : "group";
  const sender = localStorage.getItem("uid");
  const chatMessage = { targetId, sender, message };

  stompClient.publish({
    destination: `/app/send-message/${connectType}`,
    body: JSON.stringify(chatMessage),
  });
};

export const disconnect = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};
