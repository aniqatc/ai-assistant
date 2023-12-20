const chatContainer = document.querySelector("#js-chat");
chatContainer.addEventListener("scroll", autoScrollCancel);

let scrollingInterval;
let previousScrollTop = chatContainer.scrollTop;

function clearScrollInterval() {
  if (scrollingInterval) {
    clearInterval(scrollingInterval);
  }
}

function autoScrollToBottom() {
  clearScrollInterval();
  scrollingInterval = setInterval(() => {
    chatContainer.lastElementChild.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    });
  }, 1000);
}

function autoScrollCancel() {
  let currentScrollTop = chatContainer.scrollTop;
  // scrolling up causes scrollTop value to decrease
  // (scrollTop represents how much the element is being scrolled vertically)
  if (currentScrollTop < previousScrollTop) {
    clearScrollInterval();
  }
  previousScrollTop = currentScrollTop; // new scroll value
}

export { autoScrollToBottom };
