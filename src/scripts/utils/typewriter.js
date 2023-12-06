import Typewriter from 'typewriter-effect/dist/core';
import { triggerSlideInAnimation } from './messageAnimation';

// temporary content
const loremLong =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const loremShort =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';

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
	});
});

triggerTypewriter();
