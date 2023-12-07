import typeDefaultMessages from '../utils/defaultMessages';
import { triggerSlideInAnimation } from '../utils/messageAnimation';
import { autoScrollToBottom, checkScrollInterval } from '../utils/chatScroll';

const storedOptionType = localStorage.getItem('optionType');
const radioButtons = document.querySelectorAll('input[name="options"]');

radioButtons.forEach(radio => {
	radio.addEventListener('click', event => {
		const option = event.target.value;
		localStorage.setItem('optionType', option);

		triggerSlideInAnimation('.js-message');
		typeDefaultMessages(option);
		checkScrollInterval();
		autoScrollToBottom();
	});
});

function applySavedOption() {
	if (storedOptionType) {
		const storedEl = document.querySelector(`#radio-${storedOptionType}`);
		storedEl.checked = true;
		typeDefaultMessages(storedOptionType);
	}
}

export { applySavedOption };
