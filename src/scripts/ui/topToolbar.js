import { saveChatHistory, clearChatHistory } from '../chat/chatHistory';
import { printBottomToolbarMessage } from './bottomToolbar';
import { commandHandler } from '../chat/chatCommands';
import { downloadChatHistory } from '../chat/downloadChat';

const copyButton = document.querySelector('#js-copy-btn');
const saveButton = document.querySelector('#js-save-btn');
const clearButton = document.querySelector('#js-clear-btn');
const helpButton = document.querySelector('#js-help-btn');
const downloadButton = document.querySelector('#js-download-btn');
const chatContainer = document.querySelector('#js-chat');
const chatInput = document.querySelector('textarea');

function displayTemporaryMessage(el, buttonText, message) {
	const originalText = el.innerHTML;
	el.textContent = '✔︎ ' + buttonText;
	printBottomToolbarMessage(message);

	setTimeout(() => {
		el.innerHTML = originalText;
	}, 600);
}

clearButton.addEventListener('click', () => {
	const messages = chatContainer.querySelectorAll('.js-message--chat');
	messages.forEach(el => el.remove());
	clearChatHistory();
	chatInput.value = '';

	displayTemporaryMessage(clearButton, 'Cleared', 'Chat deleted from workspace...');
});

saveButton.addEventListener('click', () => {
	saveChatHistory();

	displayTemporaryMessage(saveButton, 'Saved', 'Chat saved to workspace...');
});

copyButton.addEventListener('click', () => {
	const codeBlocks = chatContainer.querySelectorAll('pre');
	const recentCodeBlock = codeBlocks[codeBlocks.length - 1];

	navigator.clipboard
		.writeText(recentCodeBlock?.textContent || 'No code blocks detected')
		.then(() => {
			displayTemporaryMessage(copyButton, 'Copied', 'Copied latest code snippet...');
		});
});

helpButton.addEventListener('click', () => {
	commandHandler('help');
	displayTemporaryMessage(helpButton, '', 'Printed built-in commands...');
});

downloadButton.addEventListener('click', () => {
	downloadChatHistory();
	displayTemporaryMessage(downloadButton, '', 'Downloaded current chat...');
});
