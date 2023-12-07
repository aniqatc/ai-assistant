import { myCodeTypewriter, myTextTypewriter } from './typewriter';

function insertMessage(elementType, content, lang) {
	const chatContainer = document.querySelector('#js-chat');
	const el = document.createElement(elementType);
	chatContainer.appendChild(el);

	lang ? myCodeTypewriter(el, content, lang) : myTextTypewriter(el, content);
	el.classList.add('js-message', 'js-response', 'animate-slide-in', 'animation-delay-300', 'py-1');

	setInterval(() => {
		chatContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });
	}, 1000);
}

export { insertMessage };
