import Prism from "prismjs";

// Note **
// typingTimeouts: prevents overlapping typewriting on the same element
// specific to myTextTypewriter as several elements involving text can trigger multiple timeouts -- this prevents it
//

const typingTimeouts = new Map();
const cursor = " ●";

function myCodeTypewriter(el, content, lang) {
  const langDefault = Prism.languages.javascript;
  let i = 0;

  function typeChar() {
    if (i < content.length) {
      el.textContent = content.substring(0, i + 1) + cursor;
      i++;
      setTimeout(typeChar, 25);
    } else {
      el.textContent = content;
    }
    el.innerHTML = Prism.highlight(
      el.textContent,
      Prism.languages[lang] || langDefault,
    );
  }
  typeChar();
}

function myTextTypewriter(el, content) {
  let i = 0;
  clearTimeout(typingTimeouts.get(el));

  function typeChar() {
    if (i < content.length) {
      el.textContent = content.substring(0, i + 1) + cursor;
      i++;
      typingTimeouts.set(el, setTimeout(typeChar, 35));
    } else {
      el.textContent = content;
      typingTimeouts.delete(el);
    }
  }
  typeChar();
}

export { myCodeTypewriter, myTextTypewriter };
