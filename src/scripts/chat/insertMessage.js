import { myCodeTypewriter, myTextTypewriter } from "../ui/typewriter";
import { autoScrollToBottom } from "./chatScroll";
import { commandStyles } from "./chatCommands";
import { userStyles } from "./userInput";
import { aiStyles } from "../ai/api";

const chatContainer = document.querySelector("#js-chat");

function insertMessage(elementType, content, lang, msgType = "ai") {
  const el = document.createElement(elementType);
  chatContainer.appendChild(el);

  if (lang && lang !== "undefined") {
    el.setAttribute("data-lang", lang); // to be used for storage
    myCodeTypewriter(el, content, lang);
  } else if (msgType === "user") {
    el.textContent = content; // no typewriting effect for user inputs
  } else {
    myTextTypewriter(el, content);
  }
  addMessageStyles(el, msgType);
  autoScrollToBottom();
}

// Helper
function addMessageStyles(el, msgType) {
  if (msgType === "ai") {
    el.classList.add(...aiStyles);
  } else if (msgType === "user") {
    el.classList.add(...userStyles);
  } else if (msgType === "command") {
    el.classList.add(...commandStyles);
  }
}

export { insertMessage };
