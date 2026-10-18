import { insertMessage } from "./insertMessage";
import { processCommand } from "./chatCommands";
import { printBottomToolbarMessage } from "../ui/bottomToolbar";

// Click handlers for elements added to the chat dynamically:
// - copy buttons on each code block
// - command buttons in the "help" command list
const chatContainer = document.querySelector("#js-chat");

chatContainer.addEventListener("click", async (event) => {
  const copyButton = event.target.closest(".code-copy-btn");
  if (copyButton) {
    await copyCodeBlock(copyButton);
    return;
  }

  const commandButton = event.target.closest(".cmd-btn[data-cmd]");
  if (commandButton) {
    const command = commandButton.dataset.cmd;
    insertMessage("div", command, null, "user"); // same as typing it
    processCommand(command);
  }
});

async function copyCodeBlock(button) {
  const codeBlock = button.closest(".code-head")?.nextElementSibling;
  if (!codeBlock) return;

  await navigator.clipboard.writeText(codeBlock.textContent);
  const label = button.querySelector("span");
  label.textContent = "Copied";
  printBottomToolbarMessage("Copied code snippet...");

  setTimeout(() => {
    label.textContent = "Copy";
  }, 1200);
}
