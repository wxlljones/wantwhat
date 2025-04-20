document.addEventListener("DOMContentLoaded", () => {
  const userPostsDiv = document.getElementById("userPosts");
  const currentUser = localStorage.getItem("currentUser");
  const allWants = JSON.parse(localStorage.getItem("wants")) || [];

  if (!currentUser) {
    userPostsDiv.innerHTML = `
      <p>Please <a href="login.html">log in</a> to view your profile.</p>
    `;
    return;
  }

  const userWants = allWants.filter(want => want.username === currentUser);

  if (userWants.length === 0) {
    userPostsDiv.innerHTML = `<p>You haven't posted any wants yet.</p>`;
    return;
  }

  const list = document.createElement("ul");

  userWants.forEach((want) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${want.item}</strong>
      ${want.price ? `– Max £${want.price}` : ""}
      <p>${want.details}</p>
      ${want.image ? `<img src="${want.image}" alt="Uploaded Image" />` : ""}
    `;
    list.appendChild(li);
  });

  list.classList.add("want-list");
  userPostsDiv.appendChild(list);
});
