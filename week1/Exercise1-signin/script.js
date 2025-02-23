document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signInForm");
  const messageElement = document.createElement("span");
  messageElement.id = "message";
  messageElement.style.display = "none";

  document
    .getElementById("confirm-password")
    .parentNode.insertBefore(
      messageElement,
      document.getElementById("confirm-password").nextSibling
    );

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      messageElement.style.color = "red";
      messageElement.textContent = "Passwords do not match!";
      messageElement.style.display = "block";
      return false;
    }

    messageElement.style.color = "green";
    messageElement.textContent = "You signed in!";
    messageElement.style.display = "block";
  });
});
