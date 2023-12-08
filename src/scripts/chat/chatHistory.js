import { insertMessage } from './insertMessage';
import { insertCommandMessage } from './chatCommands';
import { printBottomToolbarMessage } from '../ui/bottomToolbar';

let msgType;

function saveChatHistory() {
	const printedMessages = document.querySelectorAll('.js-message--chat');
	const messagesArray = Array.from(printedMessages).map(message => {
		setMsgType(message);
		return {
			el: message.innerHTML,
			elementType: message.tagName.toLowerCase(),
			lang: message.getAttribute('data-lang') || null,
			content: message.textContent,
			msgType,
		};
	});

	localStorage.setItem('chatHistory', JSON.stringify(messagesArray));
}

function getChatHistory() {
	const storedMessages = JSON.parse(localStorage.getItem('chatHistory'));

	if (storedMessages.length > 0) {
		printBottomToolbarMessage('Chat retrieved from last session...');

		storedMessages.forEach(message => {
			handleStoredMessage(message);
		});
	} else {
		printBottomToolbarMessage('New chat created...');
	}
}

// Helpers

function handleStoredMessage(message) {
	message.msgType === 'command'
		? insertCommandMessage(message)
		: insertMessage(message.elementType, message.content, message.lang, message.msgType);
}

function setMsgType(message) {
	if (Object.values(message.classList).includes('js-message--user')) {
		return (msgType = 'user');
	} else if (Object.values(message.classList).includes('js-message--command')) {
		return (msgType = 'command');
	} else {
		return (msgType = 'ai');
	}
}

function clearChatHistory() {
	localStorage.setItem('chatHistory', '[]');
}

export { saveChatHistory, getChatHistory, clearChatHistory };
