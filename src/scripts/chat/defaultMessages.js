import { myTextTypewriter } from './typewriter';

const refine = ['Refine - instructions', 'Refine - avoid'];
const debug = ['Debug instructions', 'Debug avoid'];
const convert = ['Convert instructions', 'Convert avoid'];
const explain = ['Explain instructions', 'Explain avoid'];

const messageDosEl = document.querySelector('#js-message--dos');
const messageDontsEl = document.querySelector('#js-message--donts');

export default function typeDefaultMessages(option = 'explain') {
	clearInstructions();

	let messageDos;
	let messageDonts;

	switch (option) {
		case 'refine':
			messageDos = refine[0];
			messageDonts = refine[1];
			break;
		case 'debug':
			messageDos = debug[0];
			messageDonts = debug[1];
			break;
		case 'convert':
			messageDos = convert[0];
			messageDonts = convert[1];
			break;
		case 'explain':
			messageDos = explain[0];
			messageDonts = explain[1];
			break;
		default:
			messageDos = "Default message for Do's";
			messageDonts = "Default message for Don'ts";
			break;
	}

	myTextTypewriter(messageDosEl, messageDos);
	myTextTypewriter(messageDontsEl, messageDonts);
}

function clearInstructions() {
	const messageEl = [messageDosEl, messageDontsEl];
	messageEl.forEach(el => {
		el.textContent = '';
	});
}
