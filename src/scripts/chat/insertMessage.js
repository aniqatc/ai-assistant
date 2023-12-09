import { myCodeTypewriter, myTextTypewriter } from './typewriter';
import { commandStyles } from './chatCommands';
import { userStyles } from './userInput';
import { autoScrollToBottom } from './chatScroll';

const chatContainer = document.querySelector('#js-chat');
const aiStyles = [
	'js-message--chat',
	'js-message',
	'animate-slide-in',
	'animation-delay-300',
	'py-1',
];

function insertMessage(elementType, content, lang, msgType = 'ai') {
	const el = document.createElement(elementType);
	chatContainer.appendChild(el);
	autoScrollToBottom();

	if (lang && lang !== 'undefined') {
		el.setAttribute('data-lang', lang);
		myCodeTypewriter(el, content, lang);
	} else if (msgType === 'user') {
		el.textContent = content;
	} else {
		myTextTypewriter(el, content);
	}

	addMessageStyles(el, msgType);
}

// Helper

function addMessageStyles(el, msgType) {
	if (msgType === 'ai') {
		el.classList.add(...aiStyles);
	} else if (msgType === 'user') {
		el.classList.add(...userStyles);
	} else if (msgType === 'command') {
		el.classList.add(...commandStyles);
	}
}

export { insertMessage };
