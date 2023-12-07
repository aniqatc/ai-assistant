import insertHighlightedElement from './highlight';

const exampleHTML = `<div>
	<input
		class="appearance-none peer option-input"
		type="radio"
		id="radio-explain"
		name="options"
		value="explain"
		checked />
	<label
		for="radio-explain"
		class="option-label group">
		<span class="option-radio scale-0 group-hover:scale-100">
			<i class="fa-solid fa-check"></i>
		</span>
		<span class="xs:text-4xl text-xl"><i class="fa-solid fa-comment-dots"></i></span>
		<span>Explain</span>
	</label>
</div>`;

const exampleCSS = `/* Prism syntax highlighting style overrides */

code,
pre,
code[class*='language-'],
pre[class*='language-'] {
	word-break: break-word;
	border-radius: 0px;
	font-size: 12px;
	font-family: 'Source Code Pro', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace';
	padding: 0.5rem;
	background-color: #fcf7ff;
	overflow: auto;
}

pre > code,
pre[class*='language-'] > code {
	box-shadow: none;
	border: none;
	background: none;
}`;

const exampleJS = `(function () {
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme) {
		root.classList.toggle('dark', savedTheme === 'dark');
	}
})();`;

const examplePython = `num = float(input("Enter a number: "))
if num >= 0:
   if num == 0:
       print("Zero")
   else:
       print("Positive number")
else:
   print("Negative number")
`;

insertHighlightedElement('pre', exampleCSS, 'css');
insertHighlightedElement('pre', exampleHTML, 'html');
insertHighlightedElement('pre', exampleJS, 'js');
insertHighlightedElement('pre', examplePython, 'python');
