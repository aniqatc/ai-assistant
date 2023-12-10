import { myTextTypewriter } from './typewriter';

function printBottomToolbarMessage(message) {
	const bottomBarEl = document.querySelector('#js-toolbar-message');
	myTextTypewriter(bottomBarEl, message);
}

export { printBottomToolbarMessage };
