## AI Code Assistant

[https://code.aniqa.dev/](https://code.aniqa.dev/)

🤖 A simple but feature-rich coding assistance chat powered by AI with features that include pre-defined contexts (explain, refactor, debug and convert) to streamline the chat, built-in chat commands for enhanced guidance, automatic chat encoding, Prism.js syntax highlighting, downloadable chat history file optimized for printing and the ability to use the application as a PWA.

## Light Mode

<a href="https://code.aniqa.dev" target="_blank"><img src="/src/assets/screenshot-light.png" style="max-width: 100%;"></a>

## Dark Mode

<a href="https://code.aniqa.dev" target="_blank"><img src="/src/assets/screenshot.png" style="max-width: 100%;"></a>

## Tech

- HTML5
- CSS3
- Tailwind
- JavaScript
- Webpack
- ChatGPT 3.5 through SheCodes API
- Prism.js

## Project Files

All source code can be found in the `/src` directory and the `/public` directory contains all production-ready code, bundled and optimized using Webpack.

**Webpack Configuration**

- Handles the CSS and PostCSS loaders (for Tailwind)
- Handles bundling all modularized JavaScript code
- Handles configuring HTML with meta tags and icons
- Handles retrieval of API key from hidden `.env` file using different plugins for prod vs. dev environment
- Handles `manifest.json` file required for a Progressive Web Application
- Handles minifying all CSS and JavaScript files

**Styles** in `/styles`

- `main.css` holds all additional Tailwind styling - used for repeating styles and to handle elements that are dynamically added
- `prism.css` holds styling from the [Laserwave Theme](https://github.com/Jaredk3nt/laserwave) that is slightly adjusted to fit my website's style
- `download.css` holds styles specific to the downloadable `.html` file

**Data** in `/data`

- `chatCommands.json` holds a JSON that uses either plain text strings or escaped HTML to represent content that appears when users type a specific word
- `defaultMessages.json` holds a JSON that represents specific guidelines to show the user based on which chat option that they choose

**Scripts** in `/scripts`

- `/ai` handles the AI API
- `/chat` handles information submitted by the user, dynamic content either triggered by API response or through built-in chat commands, handling chat history in browser storage, downloading chat history file and additional helpers (automatic chat scrolling, etc)
- `/ui` handles the theme, typewriting effect, radio button selection, chat message animation and the top/bottom toolbar buttons

## Key Features

**Design**

- Fully responsive without using traditional media queries
- Custom Tailwind configuration to handle custom fonts, animations and screen sizes
- Prism.js styling used for syntax highlighting and further customized with my own styles
- Light and dark mode styles, including light and dark syntax highlighting
- Additional `.css` file to apply internal CSS to the chat history's downloadable `.html` file
- Subtle transitions and animations for elements either requiring user interaction or to provide dynamic content
- Typewriting effect for chat-related content
- Response time shows green for responses that arrive in less than 5s, otherwise, it'll appear red

**Interactive Elements**

- User-friendly chat interface for an interactive and visually-pleasing experience for coding-relating queries
- Built-in chat commands allows user to access the website entirely from the chat interface
- Toolbar: copy the latest AI-generated code snippet, save chat history for next time, clear the chat, export styled `.html` file or print the built-in commands to the chat
- Bottom toolbar: prints the last task that was completed and provides the time it takes for a response to arrive
- Toggle between custom styled radio buttons to select a chat option

**Behind-the-Scenes**

- Four prompt options that provide a different context to the chat - allowing for quick coding assistance (users can drop a code snippet without providing any details and the chat will know what to do)
- Built-in chat commands that provides the user with the ability to use the website without using the mouse to trigger click events and to access additional information about the website and its features and limitations
- User submitted code snippets and inputs are encoded and appended to predefined prompts before request is sent to the API to ensure secure and accurate processing
- Utilizes the ChatGPT AI model to understand respond to user inputs effectively
- AI responses are provided in JSON and are parsed before rendering to user with custom styling and formatting
- Chat history and user preferences can be saved to browser storage and handled by the user via the toolbar
- Allow chat history to be downloaded to a styled `.html` file with the filename including the website name and date of download
- Time from request initiation to response is calculated to give users insight to the AI's performance
- Ability to download the website as a Progressive Web Application (PWA) allowing users to use the features like a native application on desktops or mobile devices
- Syntax highlighting is added dynamically as they are recieved by the AI
- Typewriter effect with custom cursor created with the assistance of `setTimeout()` and `substring()` methods

## Limitations

- Character Limit: The AI chat has a maximum capacity of 1000 characters per submission, however, I am using 300 characters to provide context for each chat so users can only provide 700 characters per submission so the `<textarea>` element is adjusted to reflect this limitation.
- Handling Complex Issues: For more intricate coding-related queries, I recommend dividing the code into smaller segments and interacting with the chat step-by-step. Alternatively, it might be better to use ChatGPT directly for more extensive assistance.
- Adherence to Guidelines: For the most optimal experience, please ensure that you follow the specific guidelines provided for each assistance option.
- Limited testing: I've only tested the chat with popular languages (JavaScript, CSS/SASS, Typescript, Python, Java, Lua) and some random ones like COBOL and it worked as expected _(so far)_.

## Available Scripts

#### `npm run build`

- Build in production mode + sets `NODE_ENV` variable to `production`

#### `npm run start`

- Starts the development server + sets `NODE_ENV` variable to `development`
