import "../styles/main.css";
import "prismjs";
import "prismjs/themes/prism-coy.css";
import "../styles/prism.css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-java";
import "prismjs/components/prism-lua";
import "prismjs/components/prism-mongodb";
import { applySavedTheme } from "./ui/theme";
import { applyRadioOption } from "./ui/radioButtons";
import { getChatHistory } from "./chat/chatHistory";
import { typeDefaultMessages } from "./chat/defaultMessages";
import { printBottomToolbarMessage } from "./ui/bottomToolbar";
import "./ui/topToolbar";
import "./chat/chatScroll";
import "./chat/userInput";

// Initialize
applySavedTheme();
typeDefaultMessages();
printBottomToolbarMessage("New chat created...");
applyRadioOption();
getChatHistory();
