import { myCodeTypewriter, myTextTypewriter } from './typewriter';

function insertMessage(elementType, content, lang) {
	const chatContainer = document.querySelector('#js-chat');
	const el = document.createElement(elementType);
	chatContainer.appendChild(el);

	if (lang) {
		myCodeTypewriter(el, content, lang);
	} else {
		myTextTypewriter(el, content);
	}

	el.classList.add('js-message', 'animate-slide-in', 'animation-delay-300', 'py-1');
}

export { insertMessage };
