document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("users.json").then(res => res.json()),
    fetch("posts.json").then(res => res.json())
  ]).then(([users, posts]) => {
    const userList = document.getElementById("user-list");
    const userPosts = document.getElementById("user-posts");

    // Заполнение списка пользователей
    users.forEach(user => {
      const userDiv = document.createElement("div");
      userDiv.textContent = user.name;
      userDiv.className = "user-item";

      userDiv.addEventListener("click", () => {
        userPosts.innerHTML = ""; // Очистка предыдущих постов

        const filteredPosts = posts.filter(post => post.userId === user.id);

        // Отображение постов пользователя
        filteredPosts.forEach(post => {
          const postCard = document.createElement("div");
          postCard.className = "post-card";
          postCard.innerHTML = `
                      <h4>${post.title}</h4>
                      <p>${post.body}</p>
                  `;
          userPosts.appendChild(postCard);
        });
      });

      userList.appendChild(userDiv);
    });
  });
});