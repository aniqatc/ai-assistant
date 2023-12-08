import typeDefaultMessages from '../chat/defaultMessages';
import { triggerSlideInAnimation } from '../chat/messageAnimation';
import { autoScrollToBottom, checkScrollInterval } from '../chat/chatScroll';

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

function applyRadioOption() {
	if (storedOptionType) {
		const storedEl = document.querySelector(`#radio-${storedOptionType}`);
		storedEl.checked = true;
		typeDefaultMessages(storedOptionType);
	} else {
		typeDefaultMessages('explain');
	}
}

export { applyRadioOption };
