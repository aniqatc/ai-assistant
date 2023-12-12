async function downloadChatHistory() {
  const chatContent = document.querySelector("#js-chat").innerHTML;
  const cssStyles = await getDownloadStyles();

  const chatBlob = new Blob([chatContent + cssStyles], { type: "text/html" });
  const currentDate = new Date().toISOString().split("T")[0];

  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(chatBlob);
  downloadLink.download = `code.aniqa.dev_${currentDate}.html`;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

async function getDownloadStyles() {
  const response = await fetch("/download.css");
  const cssText = await response.text();
  return `<style>${cssText}</style>`;
}

export { downloadChatHistory };
