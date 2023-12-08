import { myCodeTypewriter, myTextTypewriter } from './typewriter';
import { autoScrollToBottom } from './chatScroll';

const chatContainer = document.querySelector('#js-chat');

function insertMessage(elementType, content, lang) {
	const el = document.createElement(elementType);
	chatContainer.appendChild(el);

	if (lang) {
		el.setAttribute('data-lang', lang);
		myCodeTypewriter(el, content, lang);
	} else {
		myTextTypewriter(el, content);
	}

	el.classList.add('js-message', 'js-response', 'animate-slide-in', 'animation-delay-300', 'py-1');

	autoScrollToBottom();
}

export { insertMessage };
