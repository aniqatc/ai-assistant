async function downloadChatHistory() {
	const chatContent = document.querySelector('#js-chat').innerHTML;

	const response = await fetch('/download.css');
	const text = await response.text();
	const cssStyles = `<style>${text}</style>`;

	const chatBlob = new Blob([chatContent + cssStyles], { type: 'text/html' });

	const currentDate = new Date();
	const formattedDate = currentDate.toISOString().split('T')[0];

	const downloadLink = document.createElement('a');
	downloadLink.href = URL.createObjectURL(chatBlob);
	downloadLink.download = `code.aniqa.dev-${formattedDate}.html`;

	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

export { downloadChatHistory };
