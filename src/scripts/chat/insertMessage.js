import { myCodeTypewriter, myTextTypewriter } from './typewriter';
import { autoScrollToBottom } from './chatScroll';

const chatContainer = document.querySelector('#js-chat');

function insertMessage(elementType, content, lang, msgType = 'ai') {
	const el = document.createElement(elementType);
	chatContainer.appendChild(el);

	if (lang) {
		el.setAttribute('data-lang', lang);
		myCodeTypewriter(el, content, lang);
	} else if (msgType === 'user') {
		el.textContent = content; // user content should display immediately & skip typewriting
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
	} else {
		el.classList.add(
			'js-message--chat',
			'js-message',
			'js-message--user',
			'animate-slide-in',
			'animation-delay-300',
			'py-1',
			'text-slate-500',
			'dark:text-slate-300'
		);
	}

	autoScrollToBottom();
}

export { insertMessage };
