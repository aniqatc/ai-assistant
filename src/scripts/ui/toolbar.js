import { saveChatHistory, clearChatHistory } from '../chat/chatHistory';

const copyButton = document.querySelector('#js-copy-btn');
const saveButton = document.querySelector('#js-save-btn');
const clearButton = document.querySelector('#js-clear-btn');
const messageEl = document.querySelector('#js-toolbar-message');
const chatContainer = document.querySelector('#js-chat');
const chatInput = document.querySelector('textarea');

function displayTemporaryMessage(el, buttonText, message) {
	const originalText = el.innerHTML;
	el.textContent = '✔︎ ' + buttonText;
	messageEl.textContent = message;
	setTimeout(() => {
		el.innerHTML = originalText;
	}, 600);
}

clearButton.addEventListener('click', () => {
	const messages = chatContainer.querySelectorAll('.js-response');
	messages.forEach(el => el.remove());
	clearChatHistory();
	chatInput.value = '';
	displayTemporaryMessage(
		clearButton,
		'Cleared',
		'Chat history deleted from browser storage and workspace...'
	);
});

saveButton.addEventListener('click', () => {
	saveChatHistory();
	displayTemporaryMessage(
		saveButton,
		'Saved',
		'Chat history saved to browser storage and workspace...'
	);
});

copyButton.addEventListener('click', () => {
	const codeBlocks = chatContainer.querySelectorAll('pre');
	const recentCodeBlock = codeBlocks[codeBlocks.length - 1];

	navigator.clipboard
		.writeText(recentCodeBlock?.textContent || 'No code blocks detected')
		.then(() => {
			displayTemporaryMessage(
				copyButton,
				'Copied',
				'Successfully copied most recent code block to clipboard...'
			);
		});
});
