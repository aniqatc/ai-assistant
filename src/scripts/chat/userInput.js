import { insertMessage } from "./insertMessage";
import { commandsList, processCommand } from "../chat/chatCommands";
import { processAPIResponse } from "../ai/api";

const userStyles = [
  "js-message",
  "js-message--chat",
  "js-message--user",
  "animate-slide-in",
  "animation-delay-300",
  "py-1",
  "text-slate-500",
  "dark:text-slate-300",
];

const messageEl = document.querySelector("#js-toolbar-message");
const userInput = document.querySelector("#js-user-input");
const textarea = document.querySelector("#js-user-form");
const charCount = document.querySelector("#js-char-count");

userInput.addEventListener("input", () => {
  charCount.textContent = userInput.value.length;
});

textarea.addEventListener("submit", (event) => {
  event.preventDefault();
  insertMessage("div", userInput.value, null, "user");

  const currentInputValue = userInput.value.toLowerCase().trim();
  commandsList.includes(currentInputValue)
    ? processCommand(currentInputValue)
    : processAPIResponse(currentInputValue);

  userInput.value = "";
  userInput.dispatchEvent(new Event("input")); // resets the character counter
  messageEl.textContent = "";
});

export { userStyles };
