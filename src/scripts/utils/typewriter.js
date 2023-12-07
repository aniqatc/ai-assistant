import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';

const typingTimeouts = new Map();

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
	clearTimeout(typingTimeouts.get(el));

	function typeChar() {
		if (i < content.length) {
			el.textContent += content.charAt(i);
			i++;
			typingTimeouts.set(el, setTimeout(typeChar, 50));
		} else {
			typingTimeouts.delete(el);
		}
	}
	typeChar();
}

export { myCodeTypewriter, myTextTypewriter };
