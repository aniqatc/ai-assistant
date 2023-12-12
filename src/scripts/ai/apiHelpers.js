import { insertMessage } from "../chat/insertMessage";

const API_KEY = process.env.API_KEY;
let context = `Please provide responses in the following structured JSON format & do not provide ANY text outside of the JSON format:
{
    "1": {
        "element": "div",
        "content": "Your first message here."
    },
    "2": {
        "element": "pre",
        "content": {
            "code": "Your code snippet here",
            "language": "Specify programming language or null"
        }
    }
}`;

function generatePrompt(option, userInput) {
  const guidelines = {
    explain: "Provide an explanation of what my code does line-by-line.",
    refactor: "Tell me how to improve my code snippet.",
    debug: "Help me identify the issue with my code.",
    convert: "Convert the code into the specified language.",
  };
  return encodeURIComponent(`${guidelines[option]} ${userInput}`);
}

function generateRequestURL(userInput) {
  const selectedRadio = document.querySelector('input[name="options"]:checked');
  const prompt = generatePrompt(selectedRadio.value, userInput);
  const encodedContext = encodeURIComponent(context);
  return `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${encodedContext}&key=${API_KEY}`;
}

function displayAIResponse(answer) {
  for (let el in answer) {
    const { element, content } = answer[el];
    content.code
      ? insertMessage(element, content.code, content.language)
      : insertMessage(element, content, null);
  }
}

export { displayAIResponse, generateRequestURL };
