import { writeFile, unlink, mkdtemp } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { convertWithMarkitdown } from '../utils/markitdown'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const fileField = formData.find((field) => field.name === 'file')

  if (!fileField || !fileField.data || !fileField.filename) {
    throw createError({ statusCode: 400, message: 'Invalid file upload' })
  }

  if (fileField.data.length > MAX_FILE_SIZE) {
    throw createError({ statusCode: 413, message: 'File size exceeds 50MB limit' })
  }

  const originalFilename = fileField.filename.replace(/[^a-zA-Z0-9._-]/g, '_')

  let tempDir: string | null = null
  let tempPath: string | null = null

  try {
    tempDir = await mkdtemp(join(tmpdir(), 'markitdown-'))
    tempPath = join(tempDir, originalFilename)

    await writeFile(tempPath, fileField.data)

    const markdown = await convertWithMarkitdown(tempPath)

    return {
      markdown,
      filename: fileField.filename,
    }
  } catch (err: unknown) {
    const error = err as { statusCode?: number; message?: string }
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Conversion failed',
    })
  } finally {
    if (tempPath) {
      await unlink(tempPath).catch(() => {})
    }
    if (tempDir) {
      const { rmdir } = await import('node:fs/promises')
      await rmdir(tempDir).catch(() => {})
    }
  }
})
