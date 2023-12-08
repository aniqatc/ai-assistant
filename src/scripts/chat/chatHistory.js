import { insertMessage } from './insertMessage';

function saveChatHistory() {
	const printedMessages = document.querySelectorAll('.js-message--chat');
	const messagesArray = Array.from(printedMessages).map(message => {
		let msgType;

		Object.values(message.classList).includes('js-message--user')
			? (msgType = 'user')
			: (msgType = 'ai');

		return {
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
			insertMessage(message.elementType, message.content, message.lang, message.msgType);
		});
	}
}

function clearChatHistory() {
	localStorage.setItem('chatHistory', '');
}

export { saveChatHistory, getChatHistory, clearChatHistory };
