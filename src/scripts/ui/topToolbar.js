import { saveChatHistory, clearChatHistory } from "../chat/chatHistory";
import { printBottomToolbarMessage } from "./bottomToolbar";
import { processCommand } from "../chat/chatCommands";
import { downloadChatHistory } from "../chat/downloadChat";

const chatContainer = document.querySelector("#js-chat");
const chatInput = document.querySelector("textarea");
const copyButton = document.querySelector("#js-copy-btn");
const saveButton = document.querySelector("#js-save-btn");
const clearButton = document.querySelector("#js-clear-btn");
const helpButton = document.querySelector("#js-help-btn");
const downloadButton = document.querySelector("#js-download-btn");

function displayTemporaryMessage(el, buttonText, message) {
  const originalText = el.innerHTML;
  el.textContent = "✔︎ " + buttonText; // temporary messaging within el
  printBottomToolbarMessage(message);

  setTimeout(() => {
    el.innerHTML = originalText;
  }, 600);
}

copyButton.addEventListener("click", async () => {
  const codeBlocks = chatContainer.querySelectorAll("pre");
  const recentCodeBlock = codeBlocks[codeBlocks.length - 1];

  const textToCopy = recentCodeBlock?.textContent || "No code blocks detected";
  await navigator.clipboard.writeText(textToCopy);
  displayTemporaryMessage(
    copyButton,
    "Copied",
    "Copied latest code snippet...",
  );
});

saveButton.addEventListener("click", () => {
  saveChatHistory(); // saves to localStorage
  displayTemporaryMessage(saveButton, "Saved", "Chat saved to workspace...");
});

downloadButton.addEventListener("click", () => {
  downloadChatHistory();
  displayTemporaryMessage(downloadButton, "", "Downloaded current chat...");
});

helpButton.addEventListener("click", () => {
  processCommand("disclaimer");
  processCommand("help");
});

clearButton.addEventListener("click", () => {
  const messages = chatContainer.querySelectorAll(".js-message--chat");
  messages.forEach((el) => el.remove()); // removes from DOM
  clearChatHistory(); // removes from localStorage
  chatInput.value = ""; // clears input

  displayTemporaryMessage(
    clearButton,
    "Cleared",
    "Chat deleted from workspace...",
  );
});
