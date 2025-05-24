import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import UserList from "./UserList";
import PostsList from "./PostsList";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("all"); // 'all' or 'users'

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users "),
          fetch("https://jsonplaceholder.typicode.com/posts "),
        ]);
        if (!usersRes.ok || !postsRes.ok) throw new Error("Ошибка загрузки");
        const usersData = await usersRes.json();
        const postsData = await postsRes.json();
        setUsers(usersData);
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setMode("user");
  };

  if (loading) return <div>Загрузка данных...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Выберите режим отображения:</h2>
      <button onClick={() => setMode("all")}>Все посты</button>
      <button onClick={() => setMode("users")}>Список пользователей</button>

      {mode === "all" && <PostsList posts={posts} users={users} />}
      {mode === "users" && (
        <div style={{ display: "flex", gap: "20px" }}>
          <UserList users={users} onSelect={handleUserClick} />
          <div style={{ flex: 1 }}>
            <h3>Посты пользователя</h3>
            {selectedUserId ? (
              <PostsList
                posts={posts.filter((p) => p.userId === selectedUserId)}
                users={users}
              />
            ) : (
              <p>Выберите пользователя</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;