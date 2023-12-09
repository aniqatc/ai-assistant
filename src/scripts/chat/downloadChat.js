async function downloadChatHistory() {
	const chatContent = document.querySelector('#js-chat').innerHTML;

	// get css styles for print copy
	const response = await fetch('/download.css');
	const text = await response.text();
	const cssStyles = `<style>${text}</style>`;

	// create downloadable copy
	const chatBlob = new Blob([chatContent + cssStyles], { type: 'text/html' });

	// add date (for filename)
	const currentDate = new Date();
	const formattedDate = currentDate.toISOString().split('T')[0];

	const downloadLink = document.createElement('a');
	downloadLink.href = URL.createObjectURL(chatBlob);
	downloadLink.download = `code.aniqa.dev-${formattedDate}.html`;

	// handle downloading
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

export { downloadChatHistory };
