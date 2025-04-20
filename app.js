// app.js

document.addEventListener("DOMContentLoaded", () => {
  const wantForm = document.getElementById("wantForm");
  const wantList = document.getElementById("wantList");
  const filterInput = document.getElementById("filterInput");

  let wants = [];

  wantForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const item = document.getElementById("item").value;
    const price = document.getElementById("price").value;
    const details = document.getElementById("details").value;

    const want = {
      id: Date.now(),
      username,
      item,
      price,
      details,
      likes: 0
    };

    wants.push(want);
    renderWants();
    wantForm.reset();
  });

  filterInput.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    renderWants(keyword);
  });

  function renderWants(filter = "") {
    wantList.innerHTML = "";
    const filtered = wants.filter((w) =>
      w.username.toLowerCase().includes(filter) ||
      w.item.toLowerCase().includes(filter)
    );

    filtered.forEach((want) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${want.username}</strong> wants <em>${want.item}</em>
        ${want.price ? `for £${want.price}` : ""}<br />
        ${want.details ? `<small>${want.details}</small><br />` : ""}
        <button onclick="likePost(${want.id})">❤️ ${want.likes}</button>
        <button onclick="messageUser('${want.username}')">💬 Message</button>
      `;
      wantList.appendChild(li);
    });
  }

  window.likePost = (id) => {
    const post = wants.find(w => w.id === id);
    if (post) {
      post.likes++;
      renderWants(filterInput.value.toLowerCase());
    }
  };

  window.messageUser = (username) => {
    alert(`Messaging ${username}... (feature coming soon!)`);
  };
});
