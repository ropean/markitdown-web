import { convertWithMarkitdown } from '../utils/markitdown'

interface UrlBody {
  url: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<UrlBody>(event)

  if (!body?.url || typeof body.url !== 'string') {
    throw createError({ statusCode: 400, message: 'URL is required' })
  }

  const url = body.url.trim()

  try {
    new URL(url)
  } catch {
    throw createError({ statusCode: 400, message: 'Invalid URL format' })
  }

  try {
    const markdown = await convertWithMarkitdown(url)

    return {
      markdown,
      filename: url,
    }
  } catch (err: unknown) {
    const error = err as { statusCode?: number; message?: string }
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Conversion failed',
    })
  }
})
