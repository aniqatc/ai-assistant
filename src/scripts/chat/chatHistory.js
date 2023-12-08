import { insertMessage } from './insertMessage';

function saveChatHistory() {
	const printedMessages = document.querySelectorAll('.js-response');
	const messagesArray = Array.from(printedMessages).map(message => {
		return {
			elementType: message.tagName.toLowerCase(),
			lang: message.getAttribute('data-lang') || null,
			content: message.textContent,
		};
	});

	localStorage.setItem('chatHistory', JSON.stringify(messagesArray));
}

function getChatHistory() {
	const storedMessages = localStorage.getItem('chatHistory');
	if (storedMessages) {
		const messagesArray = JSON.parse(storedMessages);
		messagesArray.forEach(message => {
			insertMessage(message.elementType, message.content, message.lang);
		});
	}
}

function clearChatHistory() {
	localStorage.setItem('chatHistory', '');
}

export { saveChatHistory, getChatHistory, clearChatHistory };
