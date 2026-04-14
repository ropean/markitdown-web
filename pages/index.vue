<script setup lang="ts">
import { AlertTriangle, RotateCcw, ScanSearch } from 'lucide-vue-next'

useHead({
  title: 'MarkItDown — Convert Any File to Markdown',
  meta: [
    {
      name: 'description',
      content:
        'Upload a file or paste a URL to convert it to Markdown instantly.',
    },
  ],
})

const { markdown, filename, loading, error, isEmpty, hasResult, convert, convertUrl, reset } =
  useConvert()

function handleUpload(file: File) {
  convert(file)
}

function handleUrl(url: string) {
  convertUrl(url)
}
</script>

<template>
  <div class="playground">
    <section class="hero">
      <h1 class="hero-title">Convert anything to Markdown</h1>
      <p class="hero-subtitle">
        Upload a file or paste a URL to get clean Markdown output
      </p>
    </section>

    <section class="upload-section">
      <FileUpload :loading="loading" @upload="handleUpload" />
      <div class="input-divider">
        <span class="divider-line" />
        <span class="divider-text">or enter a URL</span>
        <span class="divider-line" />
      </div>
      <UrlInput :loading="loading" @submit="handleUrl" />
    </section>

    <section v-if="error" class="error-section">
      <div class="error-banner">
        <AlertTriangle :size="18" />
        <span>{{ error }}</span>
      </div>
    </section>

    <section v-if="isEmpty" class="empty-section">
      <div class="empty-banner">
        <ScanSearch :size="24" />
        <div class="empty-text">
          <p class="empty-title">No text content extracted</p>
          <p class="empty-detail">
            This file may be a scanned image or contain only non-text elements.
            Consider using an OCR tool such as
            <a
              href="https://github.com/microsoft/markitdown/tree/main/packages/markitdown-ocr"
              target="_blank"
              rel="noopener noreferrer"
            >markitdown-ocr</a>
            to extract text from images.
          </p>
        </div>
      </div>
      <button class="reset-btn empty-reset" @click="reset">
        <RotateCcw :size="14" />
        <span>Try another file</span>
      </button>
    </section>

    <section v-else-if="hasResult" class="result-section">
      <div class="result-header">
        <p class="result-filename">{{ filename }}</p>
        <button class="reset-btn" @click="reset">
          <RotateCcw :size="14" />
          <span>Convert another</span>
        </button>
      </div>
      <MarkdownPreview :markdown="markdown" :filename="filename" />
    </section>
  </div>
</template>

<style scoped>
.playground {
  padding: 48px 0 64px;
}

.hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 40px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--color-text-primary);
  margin-bottom: 12px;
}

.hero-subtitle {
  font-size: 17px;
  color: var(--color-text-tertiary);
  line-height: 1.5;
}

.hero-subtitle a {
  color: var(--color-primary);
  font-weight: 500;
}

.upload-section {
  margin-bottom: 32px;
}

.input-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 20px 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--color-border);
  transition: background-color 0.33s;
}

.divider-text {
  font-size: 13px;
  color: var(--color-text-tertiary);
  white-space: nowrap;
}

.error-section {
  margin-bottom: 24px;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background-color: var(--color-bg-alt);
  border: 1px solid var(--color-error);
  border-radius: 4px;
  color: var(--color-error);
  font-size: 14px;
}

.result-section {
  margin-bottom: 32px;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.result-filename {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  border-radius: 4px;
  transition: background-color 0.33s, color 0.33s;
}

.reset-btn:hover {
  background-color: var(--color-bg-alt);
  color: var(--color-text-primary);
}

.empty-section {
  margin-bottom: 24px;
}

.empty-banner {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px;
  background-color: var(--color-bg-alt);
  border: 1px solid var(--color-border-strong);
  border-radius: 4px;
  color: var(--color-text-secondary);
  transition: background-color 0.33s, border-color 0.33s;
}

.empty-banner > svg {
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--color-text-tertiary);
}

.empty-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 6px;
}

.empty-detail {
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-tertiary);
}

.empty-detail a {
  color: var(--color-primary);
  font-weight: 500;
}

.empty-reset {
  margin-top: 12px;
}

/* Responsive */
@media (max-width: 768px) {
  .playground {
    padding: 32px 0 48px;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .hero {
    margin-bottom: 24px;
  }

  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
