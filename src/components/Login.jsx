import React, { useState } from "react";
import userApi from "../api/userApi";

const Login = ({ onLogin, onShowSignup }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await userApi.login(username.trim());
      console.log("Response: ", response.data);

      // Giả sử response.data.uid là uid trả về từ backend
      const uid = response.data.id;
      if (uid) {
        localStorage.setItem("uid", uid);
        localStorage.setItem("fullName", response.data.fullName || "");
        onLogin(response.data.fullName);
      } else {
        setError("Đăng nhập thất bại: Không nhận được uid");
      }
    } catch (err) {
      setError("Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Đăng nhập
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập username..."
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition mb-2"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        <button
          type="button"
          onClick={onShowSignup}
          className="w-full px-4 py-2 bg-gray-200 text-blue-700 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Đăng ký tài khoản mới
        </button>
      </form>
    </div>
  );
};

export default Login;
