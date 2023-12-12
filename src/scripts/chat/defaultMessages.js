import { myTextTypewriter } from "../ui/typewriter";
import defaultMessages from "../../data/defaultMessages.json";

const messageDosEl = document.querySelector("#js-message--dos");
const messageDontsEl = document.querySelector("#js-message--donts");

function typeDefaultMessages(option = "explain") {
  clearInstructions();
  myTextTypewriter(messageDosEl, defaultMessages[option].do);
  myTextTypewriter(messageDontsEl, defaultMessages[option].dont);
}

function clearInstructions() {
  const messageEl = [messageDosEl, messageDontsEl];
  messageEl.forEach((el) => {
    el.textContent = "";
  });
}

export { typeDefaultMessages };
