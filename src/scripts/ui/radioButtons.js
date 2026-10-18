import { triggerSlideInAnimation } from "./messageAnimation";
import { autoScrollToBottom } from "../chat/chatScroll";
import { typeDefaultMessages } from "../chat/defaultMessages";
import { printBottomToolbarMessage } from "./bottomToolbar";
import defaultMessages from "../../data/defaultMessages.json";

const storedOptionType = localStorage.getItem("optionType");
const radioFieldset = document.querySelector("#js-radio-fieldset");
const modePill = document.querySelector("#js-mode-pill");
const userInput = document.querySelector("#js-user-input");

// Workspace label + input placeholder follow the selected mode
function updateModeUI(option) {
  modePill.textContent = option.charAt(0).toUpperCase() + option.slice(1);
  userInput.placeholder = defaultMessages[option].placeholder;
}

radioFieldset.addEventListener("change", (event) => {
  const option = event.target.value;

  triggerSlideInAnimation(".js-message"); // targets all chat elements
  typeDefaultMessages(option); // prints option-specific info
  updateModeUI(option);
  autoScrollToBottom();
  printBottomToolbarMessage(`Switched to ${option} chat...`);

  localStorage.setItem("optionType", option);
});

function applyRadioOption() {
  if (storedOptionType) {
    const storedEl = document.querySelector(`#js-radio-${storedOptionType}`);
    storedEl.checked = true;

    typeDefaultMessages(storedOptionType);
    updateModeUI(storedOptionType);
  }
}

export { applyRadioOption };
