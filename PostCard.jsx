import React from "react";

function PostCard({ post, user }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px 0",
      }}
    >
      <h4>Автор: {user?.name || "Неизвестный"}</h4>
      <h5>{post.title}</h5>
      <p>{post.body}</p>
    </div>
  );
}

export default PostCard;