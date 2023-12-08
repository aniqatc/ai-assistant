import { requestCompletionTime } from './requestTime';
import { insertMessage } from '../chat/insertMessage';
import { printBottomToolbarMessage } from '../ui/bottomToolbar';

const API_KEY = process.env.API_KEY;

let context = `Please provide the entire response in a structured JSON format. Each response sentence should be an object with keys '1', '2', '3' and so on, each containing a sub-object. You can provide as many keys as necessary to provide your response. The sub-objects should have two keys: 'element' to indicate the HTML element type ('div' for regular text, 'pre' for code blocks), and 'content' for the actual text or code snippets that are provided for each message. If any inline code or code snippet is provided, include a nested 'language' key within 'content' to specify the programming language, or set it to "null" explicitly if no code is provided. Here is an example to follow:
    {
        "element": "pre",
        "content": {
            "code": "console.log("Hello")",
            "language": "javaScript"
        }
    }. `;

async function apiHandler(prompt) {
	const startTime = Date.now();
	try {
		printBottomToolbarMessage('Initiating request...');
		prompt +=
			' PLEASE remember to put ENTIRE response inside the JSON object - do not write anything outside the JSON object when you respond. Do not put the code block in the format of a JSON object - these are to be highlighted using prism.js syntax highlighting so please follow the guidelines I provided, thank you... ';
		const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${API_KEY}`;

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

export { apiHandler };
