import 'prismjs';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import './ui/toolbar';
import { applySavedTheme } from './ui/theme';
import { applySavedOption } from './ui/radioButtons';
import './utils/defaultMessages';
import './utils/insertMessage';
import './utils/chatScroll';
import './utils/test';
import '../styles/main.css';
import '../styles/prism.css';

// Initialize
applySavedTheme();
applySavedOption();
