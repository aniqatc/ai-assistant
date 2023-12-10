## AI Code Assistant

[https://code.aniqa.dev/](https://code.aniqa.dev/)

🤖 A robust, coding assistance chat powered by AI with features that include pre-defined prompts (explain, refactor, debug and convert) to streamline the chat, built-in chat commands for enhanced guidance, automatic chat encoding, Prism.js syntax highlighting, downloading a file with chat history optimized for printing and ability to use the application as a PWA.

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

## Key Features

**Design**

- Fully responsive without using traditional media queries
- Custom Tailwind configuration to handle custom fonts, animations and screen sizes
- Prism.js styling used for syntax highlighting and further customized with my own styles
- Light and dark mode styles, including light and dark syntax highlighting
- Additional `.css` file to apply internal CSS to the chat history's downloadable `.html` file
- Subtle transitions and animations for elements either requiring user interaction or to provide dynamic content
- Typewriting effect for chat-related content

**Interactive Elements**
- Coming Soon

**Behind-the-Scenes**
- Coming Soon

## Project Files

All source code can be found in the `/src` directory and the `/public` directory contains all production-ready code, bundled and optimized using Webpack.

**Webpack Configurations**
- Handles the CSS and PostCSS (for Tailwind) for bundling
- Handles bundling all modularized JavaScript code
- Handles configuring HTML with meta tags and icons
- Handles retrieval of API key from hidden `.env` file
- Handles `manifest.json` file required for a Progressive Web Application

**Styles** in `/styles`
- `main.css` holds all additional Tailwind styling - used for repeating styles and to handle elements that are dynamically added
- `prism.css` holds styling from the [Laserwave Theme](https://github.com/Jaredk3nt/laserwave) that is slightly adjusted to fit my website's style
- `download.css` holds styles specific to the downloadable `.html` file

**Data** in `/data` 
- `chatCommands.json` holds a JSON object that uses either plain text strings or escaped HTML to represent content that appears when users type a specific word
- `defaultMessages.json` holds a JSON object that represents specific guidelines to show the user based on which chat option that they choose

**Scripts** in `/scripts` 
- `/ai` handles the AI API
- `/chat` handles information submitted by the user, dynamic content either triggered by API response or through built-in chat commands, saving, downloading chat history and additional helpers (animating messages, typewriting effect, automatic scrolling)
- `/ui` handles the theme, radio button selection and the top/bottom toolbar buttons
