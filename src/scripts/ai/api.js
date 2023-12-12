import { requestCompletionTime } from "./requestTime";
import { printBottomToolbarMessage } from "../ui/bottomToolbar";
import { generateRequestURL, displayAIResponse } from "./apiHelpers";

const aiStyles = [
  "js-message--chat",
  "js-message",
  "animate-slide-in",
  "animation-delay-300",
  "py-1",
];

async function processAPIResponse(userInput) {
  const startTime = Date.now();
  printBottomToolbarMessage("Initiating request...");

  try {
    const response = await fetch(generateRequestURL(userInput));
    const data = await response.json();
    const answer = JSON.parse(data.answer);
    displayAIResponse(answer);
  } catch (error) {
    printBottomToolbarMessage(`Request error: ${error.message}...`);
  } finally {
    requestCompletionTime(startTime);
  }
}

export { processAPIResponse, aiStyles };
