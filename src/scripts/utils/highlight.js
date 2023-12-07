import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';

const chatContainer = document.querySelector('#js-chat');
console.log(Prism, Prism.languages);

function insertMessage(elementType, content, lang) {
	const el = document.createElement(elementType);
	chatContainer.appendChild(el);

	if (lang) {
		myCodeTypewriter(el, content, lang);
	} else {
		myTextTypewriter(el, content);
	}

	el.classList.add('js-message', 'animate-slide-in', 'animation-delay-300', 'py-1');
}

function myCodeTypewriter(el, content, lang = 'txt') {
	let i = 0;

	function typeChar() {
		if (i < content.length) {
			el.textContent += content.charAt(i);
			i++;
			setTimeout(typeChar, 10);
		}
		el.innerHTML = Prism.highlight(el.textContent, Prism.languages[lang]);
	}
	typeChar();
}

function myTextTypewriter(el, content) {
	let i = 0;

	function typeChar() {
		if (i < content.length) {
			el.textContent += content.charAt(i);
			i++;
			setTimeout(typeChar, 50);
		}
	}
	typeChar();
}

export { myTextTypewriter, myCodeTypewriter, insertMessage };
