document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const welcomeMsg = document.getElementById("welcomeMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    if (!username) return;

    // Save user session
    localStorage.setItem("currentUser", username);

    welcomeMsg.textContent = `Welcome, ${username}! Redirecting...`;

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
});
