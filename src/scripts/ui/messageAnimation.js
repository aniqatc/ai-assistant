function triggerSlideInAnimation(className) {
  const slideInElements = document.querySelectorAll(className);

  slideInElements.forEach((elem) => {
    elem.classList.remove("animate-slide-in");
    void elem.offsetWidth;
    elem.classList.add("animate-slide-in");
  });
}

export { triggerSlideInAnimation };
