import React from "react";
import PostCard from "./PostCard";

function PostsList({ posts, users }) {
  const userMap = new Map(users.map((u) => [u.id, u]));

  if (posts.length === 0) {
    return <p>Нет постов для отображения.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={userMap.get(post.userId)} />
      ))}
    </div>
  );
}

export default PostsList;