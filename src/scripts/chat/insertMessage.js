import { myCodeTypewriter, myTextTypewriter } from './typewriter';
import { autoScrollToBottom, checkScrollInterval } from './chatScroll';

const chatContainer = document.querySelector('#js-chat');

function insertMessage(elementType, content, lang) {
	checkScrollInterval();

	const el = document.createElement(elementType);
	chatContainer.appendChild(el);

	lang ? myCodeTypewriter(el, content, lang) : myTextTypewriter(el, content);
	el.classList.add('js-message', 'js-response', 'animate-slide-in', 'animation-delay-300', 'py-1');

	autoScrollToBottom();
}

export { insertMessage };
