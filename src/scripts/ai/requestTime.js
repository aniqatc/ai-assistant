import { printBottomToolbarMessage } from '../ui/bottomToolbar';

const responseTime = document.querySelector('#js-response-time');
const responseTimeLabel = document.querySelector('#js-response-time-label');
const greenText = ['text-green-600', 'dark:text-green-500'];
const redText = ['text-red-600', 'dark:text-red-500'];

function requestCompletionTime(startTime) {
	const timeDifference = Date.now() - startTime;
	const isLongResponseTime = timeDifference > 5000;

	responseTimeLabel.classList.remove(...(isLongResponseTime ? greenText : redText));
	responseTimeLabel.classList.add(...(isLongResponseTime ? redText : greenText));

	responseTime.textContent = `${timeDifference / 1000}s`;
	printBottomToolbarMessage('Request completed...');
}

export { requestCompletionTime };
