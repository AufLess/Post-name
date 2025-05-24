import React from "react";

function UserList({ users, onSelect }) {
  return (
    <div>
      <h3>Пользователи</h3>
      {users.map((user) => (
        <button
          key={user.id}
          onClick={() => onSelect(user.id)}
          style={{ display: "block", margin: "5px 0", width: "100%" }}
        >
          {user.name}
        </button>
      ))}
    </div>
  );
}

export default UserList;