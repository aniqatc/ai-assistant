const chatContainer = document.querySelector('#js-chat');

let scrollingInterval;
let lastScrollTop = chatContainer.scrollTop;

chatContainer.addEventListener('scroll', autoScrollCancel);

function checkScrollInterval() {
	if (scrollingInterval) {
		clearInterval(scrollingInterval);
	}
}

function autoScrollToBottom() {
	scrollingInterval = setInterval(() => {
		chatContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });
	}, 1000);
}

function autoScrollCancel() {
	let currentScrollTop = chatContainer.scrollTop;
	if (currentScrollTop < lastScrollTop) {
		clearInterval(scrollingInterval);
	}
	lastScrollTop = currentScrollTop;
}

export { autoScrollToBottom, checkScrollInterval };
