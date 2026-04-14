<script setup lang="ts">
import { Eye, Code, Copy, ClipboardCheck, Download } from 'lucide-vue-next'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  markdown: string
  filename: string
}>()

const activeTab = ref<'preview' | 'raw'>('preview')
const copied = ref(false)

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

const renderedHtml = computed(() => md.render(props.markdown))

const downloadFilename = computed(() => {
  const base = props.filename.replace(/\.[^.]+$/, '')
  return `${base}.md`
})

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.markdown)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = props.markdown
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}

function downloadMarkdown() {
  const blob = new Blob([props.markdown], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = downloadFilename.value
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="preview-container">
    <div class="preview-toolbar">
      <div class="preview-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'preview' }"
          @click="activeTab = 'preview'"
        >
          <Eye :size="14" />
          <span>Preview</span>
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'raw' }"
          @click="activeTab = 'raw'"
        >
          <Code :size="14" />
          <span>Raw</span>
        </button>
      </div>

      <div class="preview-actions">
        <button class="action-btn" @click="copyToClipboard" :aria-label="copied ? 'Copied' : 'Copy to clipboard'">
          <Transition name="icon-fade" mode="out-in">
            <ClipboardCheck v-if="copied" :size="16" class="success-icon" />
            <Copy v-else :size="16" />
          </Transition>
        </button>
        <button class="action-btn" @click="downloadMarkdown" aria-label="Download as Markdown">
          <Download :size="16" />
        </button>
      </div>
    </div>

    <div class="preview-body">
      <div v-if="activeTab === 'preview'" class="rendered-content" v-html="renderedHtml" />
      <pre v-else class="raw-content"><code>{{ markdown }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.preview-container {
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-bg-elevated);
  overflow: hidden;
  transition: border-color 0.33s, background-color 0.33s;
}

.preview-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg-alt);
  transition: background-color 0.33s, border-color 0.33s;
}

.preview-tabs {
  display: flex;
  gap: 2px;
}

.tab-btn {
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

.tab-btn:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-elevated);
}

.tab-btn.active {
  color: var(--color-text-primary);
  background-color: var(--color-bg-elevated);
}

.preview-actions {
  display: flex;
  gap: 2px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  color: var(--color-text-tertiary);
  transition: background-color 0.33s, color 0.33s;
}

.action-btn:hover {
  background-color: var(--color-bg-elevated);
  color: var(--color-text-primary);
}

.success-icon {
  color: var(--color-success);
}

.preview-body {
  padding: 24px;
  min-height: 200px;
  max-height: 600px;
  overflow-y: auto;
}

/* Rendered markdown styling */
.rendered-content {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-primary);
  word-wrap: break-word;
}

.rendered-content :deep(h1) {
  font-size: 24px;
  font-weight: 500;
  margin: 24px 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
}

.rendered-content :deep(h2) {
  font-size: 20px;
  font-weight: 500;
  margin: 20px 0 10px;
}

.rendered-content :deep(h3) {
  font-size: 17px;
  font-weight: 500;
  margin: 16px 0 8px;
}

.rendered-content :deep(p) {
  margin: 8px 0;
}

.rendered-content :deep(ul),
.rendered-content :deep(ol) {
  padding-left: 24px;
  margin: 8px 0;
}

.rendered-content :deep(li) {
  margin: 4px 0;
}

.rendered-content :deep(code) {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 13px;
  padding: 2px 6px;
  background-color: var(--color-code-bg);
  border-radius: 3px;
}

.rendered-content :deep(pre) {
  padding: 16px;
  background-color: var(--color-code-bg);
  border-radius: 4px;
  overflow-x: auto;
  margin: 12px 0;
}

.rendered-content :deep(pre code) {
  padding: 0;
  background: none;
}

.rendered-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-size: 13px;
}

.rendered-content :deep(th),
.rendered-content :deep(td) {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  text-align: left;
}

.rendered-content :deep(th) {
  background-color: var(--color-bg-alt);
  font-weight: 500;
}

.rendered-content :deep(blockquote) {
  margin: 12px 0;
  padding: 8px 16px;
  border-left: 3px solid var(--color-primary);
  color: var(--color-text-secondary);
  background-color: var(--color-bg-alt);
  border-radius: 0 4px 4px 0;
}

.rendered-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 24px 0;
}

.rendered-content :deep(img) {
  max-width: 100%;
  border-radius: 4px;
}

.rendered-content :deep(a) {
  color: var(--color-primary);
}

/* Raw markdown styling */
.raw-content {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-secondary);
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
}

/* Transitions */
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: opacity 0.2s ease;
}

.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
}
</style>
