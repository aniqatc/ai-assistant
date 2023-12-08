import { printBottomToolbarMessage } from '../ui/bottomToolbar';

const responseTime = document.querySelector('#js-response-time');
const responseTimeLabel = document.querySelector('#js-response-time-label');

function requestCompletionTime(startTime) {
	if (Date.now() - startTime > 10000) {
		responseTimeLabel.classList.add('text-red-600', 'dark:text-red-500');
	} else {
		responseTimeLabel.classList.add('text-green-600', 'dark:text-green-500');
	}

	responseTime.textContent = `${(Date.now() - startTime) / 1000}s`;
	printBottomToolbarMessage('Request completed...');
}

export { requestCompletionTime };
