import chatCommands from "../../data/chatCommands.json";
import { autoScrollToBottom } from "./chatScroll";

const commandsList = Object.keys(chatCommands);
const commandStyles = [
  "js-message",
  "js-message--chat",
  "js-message--command",
  "animate-slide-in",
  "animation-delay-300",
];

function processCommand(userInput) {
  insertCommandMessage("", userInput);

  if (document.querySelector(`#js-radio-${userInput}`)) {
    document.querySelector(`#js-radio-${userInput}`).click();
  }
  if (document.querySelector(`#js-${userInput}-btn`) && userInput !== "help") {
    document.querySelector(`#js-${userInput}-btn`).click();
  }
}

function insertCommandMessage(message, userInput) {
  const chatContainer = document.querySelector("#js-chat");
  const div = document.createElement("div");

  // if saved obj (message) from localStorage, otherwise, use userInput:
  div.innerHTML = message.el || chatCommands[userInput];
  chatContainer.appendChild(div);
  div.classList.add(...commandStyles);

  autoScrollToBottom();
}

export { commandsList, commandStyles, processCommand, insertCommandMessage };
