import React, { useState } from "react";
import userApi from "../api/userApi";

const Signup = ({ onSignup, onShowLogin }) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !fullName.trim()) return;
    setLoading(true);
    setError("");
    try {
      const payload = { username: username.trim(), fullName: fullName.trim() };
      const response = await userApi.signup(payload);
      // Giả sử response.data.id là uid trả về từ backend
      const uid = response.data.id;
      if (uid) {
        localStorage.setItem("uid", uid);
        localStorage.setItem(
          "fullName",
          response.data.fullName || fullName.trim()
        );
        onSignup(response.data.fullName || fullName.trim());
      } else {
        setError("Đăng ký thất bại: Không nhận được uid");
      }
    } catch (err) {
      setError("Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          Đăng ký tài khoản
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập username..."
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nhập tên đầy đủ..."
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition mb-2"
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
        <button
          type="button"
          onClick={onShowLogin}
          className="w-full px-4 py-2 bg-gray-200 text-green-700 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Quay về đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Signup;
