document.getElementById("wantForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const item = document.getElementById("item").value;
  const price = document.getElementById("price").value;
  const details = document.getElementById("details").value;

  const list = document.getElementById("wantList");
  const listItem = document.createElement("li");

  listItem.innerHTML = `
    <strong>${username}</strong> wants <strong>${item}</strong>
    ${price ? `for up to <strong>£${price}</strong>` : ""}
    <p>${details}</p>
  `;

  list.prepend(listItem);

  document.getElementById("wantForm").reset();
});
