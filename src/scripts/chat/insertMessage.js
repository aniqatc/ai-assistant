import { myCodeTypewriter, myTextTypewriter } from './typewriter';
import { commandStyles } from './chatCommands';
import { userStyles } from './userInput';
import { autoScrollToBottom } from './chatScroll';

const chatContainer = document.querySelector('#js-chat');

function insertMessage(elementType, content, lang, msgType = 'ai') {
	const el = document.createElement(elementType);
	chatContainer.appendChild(el);
	autoScrollToBottom();

	if (lang) {
		el.setAttribute('data-lang', lang);
		myCodeTypewriter(el, content, lang);
	} else if (msgType === 'user') {
		el.textContent = content;
	} else {
		myTextTypewriter(el, content);
	}

	if (msgType === 'ai') {
		el.classList.add(
			'js-message--chat',
			'js-message',
			'animate-slide-in',
			'animation-delay-300',
			'py-1'
		);
	} else if (msgType === 'user') {
		el.classList.add(...userStyles);
	} else if (msgType === 'command') {
		el.classList.add(...commandStyles);
	}
}

export { insertMessage };
