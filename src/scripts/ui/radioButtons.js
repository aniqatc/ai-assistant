import { typeDefaultMessages } from '../chat/defaultMessages';
import { triggerSlideInAnimation } from './messageAnimation';
import { autoScrollToBottom } from '../chat/chatScroll';
import { printBottomToolbarMessage } from './bottomToolbar';

const storedOptionType = localStorage.getItem('optionType');
const radioFieldset = document.querySelector('#js-radio-fieldset');

radioFieldset.addEventListener('change', event => {
	const option = event.target.value;

	triggerSlideInAnimation('.js-message');
	typeDefaultMessages(option);
	autoScrollToBottom();
	printBottomToolbarMessage(`Switched to ${option} chat...`);

	localStorage.setItem('optionType', option);
});

function applyRadioOption() {
	if (storedOptionType) {
		const storedEl = document.querySelector(`#js-radio-${storedOptionType}`);
		storedEl.checked = true;
		typeDefaultMessages(storedOptionType);
	}
}

export { applyRadioOption };
