import { myTextTypewriter } from '../chat/typewriter';

function printBottomToolbarMessage(message) {
	const bottomBarEl = document.querySelector('#js-toolbar-message');
	myTextTypewriter(bottomBarEl, message);
}

export { printBottomToolbarMessage };
