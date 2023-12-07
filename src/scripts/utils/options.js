import { triggerSlideInAnimation } from './messageAnimation';
import typeDefaultMessages from './typewriter';

const storedOptionType = localStorage.getItem('optionType');
const radioButtons = document.querySelectorAll('input[type="radio"]');

radioButtons.forEach(radio => {
	radio.addEventListener('click', event => {
		const option = event.target.value;
		localStorage.setItem('optionType', option);

		triggerSlideInAnimation('.js-message');
		typeDefaultMessages(option);
	});
});

if (storedOptionType) {
	const storedEl = document.querySelector(`#radio-${storedOptionType}`);
	storedEl.checked = true;
}

typeDefaultMessages(storedOptionType);
