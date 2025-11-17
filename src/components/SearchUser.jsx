import React, { useState } from "react";
import userApi from "../api/userApi";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [userList, setUserList] = useState([]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const payload = { search: e.target.value };
    userApi
      .search(payload)
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tìm kiếm người dùng: ", error);
        setUserList([]);
      });
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Tìm kiếm người dùng..."
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {userList.length > 0 && (
        <div className="mt-2 bg-white rounded-lg shadow p-2 border">
          {userList.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition mb-1"
            >
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">
                {user.fullName ? user.fullName[0] : user.username[0]}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{user.fullName}</span>
                <span className="text-xs text-left text-gray-500">
                  @{user.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
