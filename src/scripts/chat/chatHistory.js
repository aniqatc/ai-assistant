import { insertMessage } from './insertMessage';
import { insertCommandMessage } from './chatCommands';

function saveChatHistory() {
	const printedMessages = document.querySelectorAll('.js-message--chat');
	const messagesArray = Array.from(printedMessages).map(message => {
		let msgType;
		if (Object.values(message.classList).includes('js-message--user')) {
			msgType = 'user';
		} else if (Object.values(message.classList).includes('js-message--command')) {
			msgType = 'command';
		} else {
			msgType = 'ai';
		}

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

function clearChatHistory() {
	localStorage.setItem('chatHistory', '');
}

export { saveChatHistory, getChatHistory, clearChatHistory };
