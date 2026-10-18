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
    chatContainer.insertBefore(createCodeHead(lang), el);
    myCodeTypewriter(el, content, lang);
  } else if (msgType === "user") {
    el.textContent = content; // no typewriting effect for user inputs
  } else {
    myTextTypewriter(el, content);
  }
  addMessageStyles(el, msgType);
  autoScrollToBottom();
}

// Helpers
// Header bar above each code block: language label + copy button.
// Not a .js-message--chat element, so it isn't saved to history (it's recreated on restore).
function createCodeHead(lang) {
  const head = document.createElement("div");
  head.className = "code-head";

  const label = document.createElement("span");
  label.textContent = lang;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-copy-btn";
  button.setAttribute("aria-label", "Copy this code");
  button.innerHTML = '<i class="fa-regular fa-clipboard"></i><span>Copy</span>';

  head.append(label, button);
  return head;
}

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
