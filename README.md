# AI Code Assistant

A coding chat that explains, refactors, debugs or converts a snippet in one click, with syntax-highlighted answers you can copy, save or download.

**[Live site](https://code.aniqa.dev)**

<table>
  <tr>
    <td width="50%"><a href="https://code.aniqa.dev"><img src="src/assets/screenshot-light.png" alt="The assistant in light mode, with the explain, refactor, debug and convert options above the chat" width="100%"></a></td>
    <td width="50%"><a href="https://code.aniqa.dev"><img src="src/assets/screenshot.png" alt="The same chat in dark mode with a highlighted code answer" width="100%"></a></td>
  </tr>
</table>

## Tech

- HTML, JavaScript and Tailwind CSS, bundled with Webpack
- ChatGPT 3.5 through the SheCodes AI API
- Prism.js for syntax highlighting, with a tweaked [Laserwave](https://github.com/Jaredk3nt/laserwave) theme
- PWA manifest so it installs like an app

## Features

- Pick a mode (explain, refactor, debug or convert) and paste code without writing a prompt
- Answers arrive as text and highlighted code blocks with a typewriter effect
- Built-in chat commands (type `help`) let you use the whole site from the keyboard: copy, save, clear, download, switch themes and more
- A toolbar to copy the latest code snippet, save or clear the chat, download it as a styled HTML file, or list the commands
- The bottom bar shows the last action and how long the answer took, green under 5 seconds and red over
- Light and dark themes for the page and the code

## Design

- Responsive with Tailwind's breakpoints, down to screens under 370px
- Messages slide in and toolbar buttons respond with small transitions
- The downloaded chat has its own stylesheet, so it reads well on screen and in print

## Accessibility

- Every icon-only toolbar button has a screen reader label
- The chat can be driven entirely by typed commands

## Project structure

- `src/scripts/ai/`: building the request, calling the API and timing the response
- `src/scripts/chat/`: user input, chat commands, message rendering, saving and downloading history
- `src/scripts/ui/`: theme, toolbars, mode buttons, typewriter and message animations
- `src/data/`: the chat commands and each mode's guidance message, as JSON
- `src/styles/`: Tailwind extras, the Prism theme and the download stylesheet
- `public/`: the Webpack build

## Key concepts

- **Going past the brief.** This started as a SheCodes course project where we were only given the API. The modes, commands, toolbars, history and downloads are my own additions.
- **Structured answers.** Each request asks the model to reply in a fixed JSON shape of text and code blocks, so the app can render code with Prism instead of parsing free text.
- **Prompt context per mode.** Every mode adds its own instruction to your snippet, which is why you can paste code with no explanation.
- **Keys at build time.** Webpack injects the API key from `.env` in development and from the host's environment in production, so it never sits in the repo.

## Setup

Requires Node 18+ and a SheCodes AI API key.

| Variable | Where to get it |
| --- | --- |
| `API_KEY` | Your SheCodes account |

```bash
git clone https://github.com/aniqatc/ai-assistant.git
cd ai-assistant
npm install
echo "API_KEY=your_key" > .env
npm start
```

Each request allows 1,000 characters, and 300 go to the mode's context, so the input box is capped at 700.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Dev server with `NODE_ENV=development` |
| `npm run build` | Production build into `public/` |

## Changelog

### January 2025

- Saved messages load instantly instead of replaying the typewriter effect

### December 2023

- Initial release
