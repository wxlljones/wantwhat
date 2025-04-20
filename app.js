document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wantForm");
  const list = document.getElementById("wantList");
  const filterInput = document.getElementById("filterInput");

  const savedWants = JSON.parse(localStorage.getItem("wants")) || [];

  function renderWants(wantsToRender) {
    list.innerHTML = "";
    wantsToRender.forEach((want) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${want.username}</strong> wants <strong>${want.item}</strong>
        ${want.price ? `for up to £${want.price}` : ""}.
        <p>${want.details}</p>
        ${want.image ? `<img src="${want.image}" alt="Uploaded Image" />` : ""}
      `;
      list.appendChild(li);
    });
  }

  renderWants(savedWants);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const item = document.getElementById("item").value.trim();
    const price = document.getElementById("price").value.trim();
    const details = document.getElementById("details").value.trim();
    const imageFile = document.getElementById("image").files[0];

    const reader = new FileReader();

    reader.onload = function () {
      const image = imageFile ? reader.result : null;

      const want = { username, item, price, details, image };
      savedWants.unshift(want);
      localStorage.setItem("wants", JSON.stringify(savedWants));
      renderWants(savedWants);
      form.reset();
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      const want = { username, item, price, details, image: null };
      savedWants.unshift(want);
      localStorage.setItem("wants", JSON.stringify(savedWants));
      renderWants(savedWants);
      form.reset();
    }
  });

  filterInput.addEventListener("input", () => {
    const keyword = filterInput.value.toLowerCase();
    const filtered = savedWants.filter(
      (want) =>
        want.username.toLowerCase().includes(keyword) ||
        want.item.toLowerCase().includes(keyword)
    );
    renderWants(filtered);
  });
});
