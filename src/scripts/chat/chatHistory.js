import { insertMessage } from './insertMessage';
import { insertCommandMessage } from './chatCommands';

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
	const storedMessages = localStorage.getItem('chatHistory');
	if (storedMessages) {
		const messagesArray = JSON.parse(storedMessages);

		messagesArray.forEach(message => {
			if (message.msgType === 'command') {
				insertCommandMessage(message);
			} else {
				insertMessage(message.elementType, message.content, message.lang, message.msgType);
			}
		});
	}
}

// Helpers

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
	localStorage.setItem('chatHistory', '');
}

export { saveChatHistory, getChatHistory, clearChatHistory };
