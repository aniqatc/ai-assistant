import Prism from 'prismjs';
import Typewriter from 'typewriter-effect/dist/core';
import { triggerSlideInAnimation } from './messageAnimation';

// temporary content
const loremLong =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const loremShort =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';

// refactor later
function triggerTypewriter() {
	clearInstructions();
	setTimeout(() => {
		new Typewriter('#js-instructions-dos', {
			strings: loremLong,
			autoStart: true,
			delay: 15,
			cursor: ' ●',
		});
	}, 1050);

	setTimeout(() => {
		new Typewriter('#js-instructions-donts', {
			strings: loremShort,
			autoStart: true,
			delay: 15,
			cursor: ' ●',
		});
	}, 550);
}

function clearInstructions() {
	const messageEl = document.querySelectorAll('.instruction p');
	messageEl.forEach(el => {
		el.textContent = '';
	});
}

const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach(radio => {
	radio.addEventListener('click', () => {
		triggerTypewriter();
		triggerSlideInAnimation('.instruction');
		testingCSS();
		testingHTML();
	});
});

triggerTypewriter();

let typingTimeout;
function testingHTML() {
	const loremCode = `<div>
	<input
		class="appearance-none peer option-input"
		type="radio"
		id="radio-explain"
		name="options"
		value="explain"
		checked />
	<label
		for="radio-explain"
		class="option-label group">
		<span class="option-radio scale-0 group-hover:scale-100">
			<i class="fa-solid fa-check"></i>
		</span>
		<span class="xs:text-4xl text-xl"><i class="fa-solid fa-comment-dots"></i></span>
		<span>Explain</span>
	</label>
</div>`;

	const lang = 'html';
	const highlightedText = Prism.highlight(loremCode, Prism.languages[lang]);

	const typewriter = new Typewriter('#code', {
		delay: 10,
		autoStart: true,
		cursor: '',
	});

	const block = document.querySelector('#code');

	function typeWriter(lang) {
		clearTimeout(typingTimeout);
		block.innerHTML = '';

		// manually typewriting because typewriter.js escapes html tags
		if (lang === 'html' || 'css') {
			let i = 0;

			function typeChar() {
				if (i < loremCode.length) {
					block.textContent += loremCode.charAt(i);
					i++;
					typingTimeout = setTimeout(typeChar, 10);
				}
				block.innerHTML = Prism.highlight(block.textContent, Prism.languages.html);
			}
			typeChar();
		} else {
			// for all other languages
			typewriter.typeString(highlightedText).start();
		}
	}

	typeWriter('html');
}

function testingCSS() {
	const cssExample = `/* Prism syntax highlighting style overrides */

code,
pre,
code[class*='language-'],
pre[class*='language-'] {
	word-break: break-word;
	border-radius: 0px;
	font-size: 12px;
	font-family: 'Source Code Pro', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace';
	padding: 0.5rem;
	background-color: #fcf7ff;
	overflow: auto;
}

pre > code,
pre[class*='language-'] > code {
	box-shadow: none;
	border: none;
	background: none;
}`;
	const exampleText = Prism.highlight(cssExample, Prism.languages.css);

	const typewriter2 = new Typewriter('#test', {
		delay: 10,
		autoStart: true,
		cursor: ' ●',
		cursorClassName: 'typeWriterClass',
	});

	typewriter2
		.typeString(exampleText)
		.callFunction(() => {
			const cursor = document.querySelector('.typeWriterClass');
			cursor.scrollIntoView({ behavior: 'smooth', block: 'end' });
		})
		.start();
}

testingHTML();
testingCSS();
