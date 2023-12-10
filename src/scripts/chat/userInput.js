import { insertMessage } from './insertMessage';
import { commandsArray, processCommand } from '../chat/chatCommands';
import { processAPIResponse } from '../ai/api';

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
	insertMessage('div', userInput.value, null, 'user');

	let currentInputValue = userInput.value.toLowerCase().trim();
	if (commandsArray.includes(currentInputValue)) {
		processCommand(currentInputValue);
	} else {
		processAPIResponse(userInput.value);
	}

	userInput.value = '';
	messageEl.textContent = '';
});
