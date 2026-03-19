const btn = document.getElementById("ToggleBTN");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    btn.textContent = "Light Mode";
  } else {
    btn.textContent = "Dark Mode";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "t") {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      btn.textContent = "Light Mode";
    } else {
      btn.textContent = "Dark Mode";
    }
  }
});
