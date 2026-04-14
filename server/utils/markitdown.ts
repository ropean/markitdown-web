import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const execFileAsync = promisify(execFile)

const TIMEOUT_MS = 60_000
const MAX_BUFFER = 20 * 1024 * 1024 // 20MB

function resolveMarkitdownBin(): string {
  if (process.env.MARKITDOWN_BIN) {
    return process.env.MARKITDOWN_BIN
  }

  // Check sibling markitdown project's venv (local dev layout: markitdown-hub/markitdown/.venv)
  const cwd = process.cwd()
  const candidates = [
    resolve(cwd, '..', 'markitdown', '.venv', 'bin', 'markitdown'),
    resolve(cwd, 'markitdown', '.venv', 'bin', 'markitdown'),
  ]

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate
    }
  }

  return 'markitdown'
}

const markitdownBin = resolveMarkitdownBin()

const ERROR_PATTERNS: Array<{ pattern: RegExp; message: string }> = [
  {
    pattern: /CERTIFICATE_VERIFY_FAILED|SSLCertVerificationError|SSLError/,
    message: 'SSL certificate verification failed. The target server may use a self-signed or invalid certificate.',
  },
  {
    pattern: /ConnectionError|ConnectionRefused|ECONNREFUSED/,
    message: 'Could not connect to the URL. The server may be down or unreachable.',
  },
  {
    pattern: /TimeoutError|timed?\s*out/i,
    message: 'Request timed out. The server took too long to respond.',
  },
  {
    pattern: /404|Not Found/,
    message: 'URL not found (404). Please check the link and try again.',
  },
  {
    pattern: /403|Forbidden/,
    message: 'Access denied (403). The server refused the request.',
  },
  {
    pattern: /MaxRetryError|Max retries exceeded/,
    message: 'Could not reach the URL. The server may be unavailable. Please check the link.',
  },
  {
    pattern: /Invalid URL|MissingSchema|No host specified/i,
    message: 'Invalid URL format. Please enter a valid URL.',
  },
  {
    pattern: /UnicodeDecodeError|UnicodeEncodeError/,
    message: 'Failed to decode file content. The file encoding may not be supported.',
  },
  {
    pattern: /PermissionError|Permission denied/,
    message: 'Permission denied. Unable to access the file.',
  },
  {
    pattern: /FileNotFoundError|No such file/,
    message: 'File not found. It may have been moved or deleted.',
  },
  {
    pattern: /MemoryError|Cannot allocate memory/i,
    message: 'The file is too large to process. Try a smaller file.',
  },
  {
    pattern: /IsADirectoryError/,
    message: 'A directory was provided instead of a file.',
  },
  {
    pattern: /zipfile\.BadZipFile|BadZipFile/,
    message: 'The file appears to be corrupted or is not a valid archive.',
  },
  {
    pattern: /PDFSyntaxError|PDFParser|pdfminer/i,
    message: 'Failed to parse the PDF. The file may be corrupted or password-protected.',
  },
  {
    pattern: /KeyError|IndexError|ValueError|TypeError|AttributeError/,
    message: 'An unexpected error occurred while processing the file. The format may not be fully supported.',
  },
]

function extractFriendlyError(stderr: string): string {
  for (const { pattern, message } of ERROR_PATTERNS) {
    if (pattern.test(stderr)) {
      return message
    }
  }

  return 'Something went wrong during conversion. Please try a different file or check the format.'
}

export async function convertWithMarkitdown(
  filePath: string,
): Promise<string> {
  try {
    const { stdout } = await execFileAsync(markitdownBin, [filePath], {
      timeout: TIMEOUT_MS,
      maxBuffer: MAX_BUFFER,
      env: { ...process.env },
    })

    return stdout
  } catch (err: unknown) {
    const execErr = err as { code?: string; stderr?: string; message?: string }

    if (execErr.code === 'ENOENT') {
      throw new Error(
        'markitdown CLI not found. Please install it: pip install "markitdown[all]"',
      )
    }

    if (execErr.stderr) {
      throw new Error(extractFriendlyError(execErr.stderr))
    }

    throw new Error(execErr.message || 'Unknown conversion error')
  }
}
