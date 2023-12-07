import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import Typewriter from 'typewriter-effect/dist/core';

const chatContainer = document.querySelector('#js-chat');
console.log(Prism, Prism.languages);
export default function insertHighlightedElement(elementType, content, lang) {
	const el = document.createElement(elementType);
	chatContainer.appendChild(el);

	if (lang === 'html' || lang === 'css') {
		myTypewriter(el, content, lang);
	} else {
		typeContent(el, elementType, content, lang);
	}

	el.classList.add('js-message', 'animate-slide-in', 'animation-delay-300', 'py-1');
}

function typeContent(el, elementType, content, lang) {
	const typewriter = new Typewriter(el, {
		delay: 10,
		autoStart: true,
		cursor: ' ●',
		cursorClassName: 'js-cursor',
	});

	if (elementType === 'pre') {
		const highlightedCode = Prism.highlight(content, Prism.languages[lang]);
		typewriter.typeString(highlightedCode).start();
	}

	if (elementType === 'div') {
		typewriter.typeString(content).start();
	}
}

function myTypewriter(el, content, lang) {
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
