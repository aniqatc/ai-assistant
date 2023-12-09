import { requestCompletionTime } from './requestTime';
import { insertMessage } from '../chat/insertMessage';
import { printBottomToolbarMessage } from '../ui/bottomToolbar';

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

async function apiHandler(userInput) {
	const startTime = Date.now();
	try {
		printBottomToolbarMessage('Initiating request...');
		const selectedRadio = document.querySelector('input[name="options"]:checked');

		const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${getPrompt(
			selectedRadio.value,
			userInput
		)}&context=${encodeURIComponent(context)}&key=${API_KEY}`;

		const response = await fetch(apiURL);
		const data = await response.json();
		const answer = JSON.parse(data.answer);

		for (let el in answer) {
			if (answer[el].content.code) {
				insertMessage(answer[el].element, answer[el].content.code, answer[el].content.language);
			} else {
				insertMessage(answer[el].element, answer[el].content, null);
			}
		}
	} catch (error) {
		printBottomToolbarMessage(`Request error: ${error}...`);
	} finally {
		requestCompletionTime(startTime);
	}
}

function getPrompt(option, userInput) {
	if (option === 'explain') {
		return `Guidelines: Provide a clear explanation for my coding question. ${userInput}`;
	}
	if (option === 'refactor') {
		return `Guidelines: Provide me with ways to improve my code snippet. ${userInput}`;
	}
	if (option === 'debug') {
		return `Guidelines: There is an issue with my code, help me identify the issue. ${userInput}`;
	}
	if (option === 'convert') {
		return `Guidelines: Convert the provided code into the specified language. ${userInput}`;
	}
}

export { apiHandler };
