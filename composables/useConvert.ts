interface ConvertResult {
  markdown: string
  filename: string
}

interface ConvertError {
  message: string
}

export function useConvert() {
  const markdown = ref('')
  const filename = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isEmpty = ref(false)
  const hasResult = computed(() => markdown.value.length > 0)

  async function convert(file: File) {
    loading.value = true
    error.value = null
    isEmpty.value = false
    markdown.value = ''
    filename.value = file.name

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await $fetch<ConvertResult>('/api/convert', {
        method: 'POST',
        body: formData,
      })

      markdown.value = response.markdown
      filename.value = response.filename
      isEmpty.value = !response.markdown.trim()
    } catch (err: unknown) {
      const fetchErr = err as { data?: ConvertError; message?: string }
      error.value =
        fetchErr.data?.message || fetchErr.message || 'Conversion failed'
    } finally {
      loading.value = false
    }
  }

  async function convertUrl(url: string) {
    loading.value = true
    error.value = null
    isEmpty.value = false
    markdown.value = ''
    filename.value = url

    try {
      const response = await $fetch<ConvertResult>('/api/convert-url', {
        method: 'POST',
        body: { url },
      })

      markdown.value = response.markdown
      filename.value = response.filename
      isEmpty.value = !response.markdown.trim()
    } catch (err: unknown) {
      const fetchErr = err as { data?: ConvertError; message?: string }
      error.value =
        fetchErr.data?.message || fetchErr.message || 'Conversion failed'
    } finally {
      loading.value = false
    }
  }

  function reset() {
    markdown.value = ''
    filename.value = ''
    error.value = null
    isEmpty.value = false
  }

  return {
    markdown,
    filename,
    loading,
    error,
    isEmpty,
    hasResult,
    convert,
    convertUrl,
    reset,
  }
}
