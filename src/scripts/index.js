import 'prismjs';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import './ui/toolbar';
import { applySavedTheme } from './ui/theme';
import { applyRadioOption } from './ui/radioButtons';
import { getChatHistory } from './chat/chatHistory';
import './chat/defaultMessages';
import './chat/insertMessage';
import './chat/chatScroll';
import './chat/userInput';
import '../styles/main.css';
import '../styles/prism.css';

// Initialize
applySavedTheme();
applyRadioOption();
getChatHistory();
