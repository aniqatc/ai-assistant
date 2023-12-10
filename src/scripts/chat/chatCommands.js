import chatCommands from '../../data/chatCommands.json';
import { autoScrollToBottom } from './chatScroll';

const commandsArray = Object.keys(chatCommands);
const commandStyles = [
	'js-message',
	'js-message--chat',
	'js-message--command',
	'animate-slide-in',
	'animation-delay-300',
];

function processCommand(userInput) {
	insertCommandMessage('', userInput);

	if (document.getElementById(`js-radio-${userInput}`)) {
		document.getElementById(`js-radio-${userInput}`).click();
	}
	if (
		userInput === 'save' ||
		userInput === 'clear' ||
		userInput === 'copy' ||
		userInput === 'theme' ||
		userInput === 'download'
	) {
		document.querySelector(`#js-${userInput}-btn`).click();
	}
}

function insertCommandMessage(message, userInput) {
	const chatContainer = document.querySelector('#js-chat');
	const div = document.createElement('div');
	div.innerHTML = message.el || chatCommands[userInput];
	div.classList.add(...commandStyles);
	chatContainer.appendChild(div);

	autoScrollToBottom();
}

export { commandsArray, commandStyles, processCommand, insertCommandMessage };
