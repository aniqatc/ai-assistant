import { myTextTypewriter } from "./typewriter";

function printBottomToolbarMessage(message) {
  const bottomBarLabel = document.querySelector("#js-toolbar-message");
  myTextTypewriter(bottomBarLabel, message);
}

export { printBottomToolbarMessage };
