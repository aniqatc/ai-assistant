import { myCodeTypewriter, myTextTypewriter } from './typewriter';
import { commandStyles } from './chatCommands';
import { userStyles } from './userInput';
import { autoScrollToBottom } from './chatScroll';
import { aiStyles } from '../ai/api';

const chatContainer = document.querySelector('#js-chat');

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
