import { printBottomToolbarMessage } from "./bottomToolbar";

const root = document.documentElement;
const themeButton = document.querySelector("#js-theme-btn");

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.classList.toggle("dark", savedTheme === "dark");
  }
}

themeButton.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    root.classList.contains("dark") ? "dark" : "light",
  );
  printBottomToolbarMessage("Switched theme mode...");
});

export { applySavedTheme };
