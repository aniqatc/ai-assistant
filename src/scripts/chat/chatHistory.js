import { insertMessage } from "./insertMessage";
import { insertCommandMessage } from "./chatCommands";
import { printBottomToolbarMessage } from "../ui/bottomToolbar";

function saveChatHistory() {
  const printedMessages = document.querySelectorAll(".js-message--chat");
  const messagesArray = Array.from(printedMessages).map((message) => {
    const msgType = getMsgType(message);

    return {
      el: message.innerHTML,
      elementType: message.tagName.toLowerCase(),
      lang: message.getAttribute("data-lang") || null,
      content: message.textContent,
      msgType,
    };
  });

  localStorage.setItem("chatHistory", JSON.stringify(messagesArray));
}

function getChatHistory() {
  const storedMessages = JSON.parse(localStorage.getItem("chatHistory"));

  if (storedMessages && storedMessages.length > 0) {
    printBottomToolbarMessage("Chat retrieved from last session...");

    storedMessages.forEach((message) => {
      handleStoredMessage(message);
    });
  }
}

function clearChatHistory() {
  localStorage.setItem("chatHistory", "[]");
}

// Helpers
function getMsgType(message) {
  if (Object.values(message.classList).includes("js-message--user")) {
    return "user";
  } else if (Object.values(message.classList).includes("js-message--command")) {
    return "command";
  } else {
    return "ai";
  }
}

// Based on type (commands inserted without typewriting effect)
function handleStoredMessage(message) {
  const { elementType, content, lang, msgType } = message;
  msgType === "command"
    ? insertCommandMessage(message)
    : lang
      ? insertMessage(elementType, content, lang, msgType)
      : insertMessage(elementType, content, null, "user");
}

export { getChatHistory, saveChatHistory, clearChatHistory };
