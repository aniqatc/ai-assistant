import Prism from 'prismjs';

const typingTimeouts = new Map();
const cursor = ' ●';

function myCodeTypewriter(el, content, lang = 'txt') {
	let i = 0;

	function typeChar() {
		if (i < content.length) {
			el.textContent = content.substring(0, i + 1) + cursor;
			i++;
			setTimeout(typeChar, 25);
		} else {
			el.textContent = content;
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
			el.textContent = content.substring(0, i + 1) + cursor;
			i++;
			typingTimeouts.set(el, setTimeout(typeChar, 50));
		} else {
			el.textContent = content;
			typingTimeouts.delete(el);
		}
	}
	typeChar();
}

export { myCodeTypewriter, myTextTypewriter };
