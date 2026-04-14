# MarkItDown Web

A web-based playground for [MarkItDown](https://github.com/microsoft/markitdown) — upload a file or paste a URL and get clean Markdown output.

Built with Nuxt 3, Vue 3, and the MarkItDown CLI.

## Features

- Drag-and-drop file upload or URL input
- Supports PDF, DOCX, PPTX, XLSX, HTML, CSV, JSON, XML, EPUB, images, audio, and more
- Live Markdown preview with raw source view
- Copy to clipboard and download as `.md`
- Light / dark theme with system preference detection
- Tesla-inspired minimal design using Geist Sans and Lucide icons

## Prerequisites

- Node.js 22+
- pnpm
- Python 3.12+ with `markitdown` installed:

```bash
pip install 'markitdown[all]'
```

## Development

```bash
pnpm install
pnpm dev
```

The app starts at `http://localhost:3000`. The server calls the `markitdown` CLI via subprocess — make sure it is available in your PATH or in the sibling `../markitdown/.venv/bin/`.

## Docker

Build and run in a single container (Node.js + Python + markitdown):

```bash
pnpm docker:up     # build image & start on port 5006
pnpm docker:down   # stop & remove container
```

## Project Structure

```
assets/css/         CSS custom properties, themes, global styles
components/         Vue components (header, upload, preview, etc.)
composables/        useConvert composable (upload + API logic)
layouts/            Default layout with header and footer
pages/              Index page (playground)
server/api/         Nitro API routes (file upload, URL convert)
server/utils/       markitdown CLI subprocess wrapper
public/             Static assets (favicon)
```

## License

MIT
