import { insertMessage } from './insertMessage';
import { commandsArray, commandHandler } from '../chat/chatCommands';
import { randomMessage } from './dummy';

export const userStyles = [
	'js-message--chat',
	'js-message--user',
	'js-message',
	'animate-slide-in',
	'animation-delay-300',
	'py-1',
	'text-slate-500',
	'dark:text-slate-300',
];

const userInput = document.querySelector('#js-user-input');
const form = document.querySelector('#js-user-form');
const messageEl = document.querySelector('#js-toolbar-message');

form.addEventListener('submit', event => {
	event.preventDefault();
	// print user message
	insertMessage('div', userInput.value, null, 'user');

	// handle where to get response from...
	let currentInputValue = userInput.value.toLowerCase();
	if (commandsArray.includes(currentInputValue)) {
		// handle any command related responses
		commandHandler(currentInputValue);
	} else {
		// handle ai response
		randomMessage();
	}

	userInput.value = '';
	messageEl.textContent = '';
});
