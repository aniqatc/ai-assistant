import './styles.css';
import Typewriter from 'typewriter-effect/dist/core';

const root = document.documentElement;
const themeButton = document.querySelector('#js-theme-btn');

(function () {
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) {
		root.classList.toggle('dark', savedTheme === 'dark');
	}
})();

themeButton.addEventListener('click', () => {
	root.classList.toggle('dark');
	localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
});

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
	}, 1000);

	setTimeout(() => {
		new Typewriter('#js-instructions-donts', {
			strings: loremShort,
			autoStart: true,
			delay: 15,
			cursor: ' ●',
		});
	}, 750);
}

function triggerSlideInAnimation() {
	const slideInElements = document.querySelectorAll('.instruction');
	slideInElements.forEach(elem => {
		elem.classList.remove('animate-slide-in');
		void elem.offsetWidth;
		elem.classList.add('animate-slide-in');
	});
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
		triggerSlideInAnimation();
	});
});

triggerTypewriter();
