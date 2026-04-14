<script setup lang="ts">
import { Upload, FileText, Loader } from 'lucide-vue-next'

const emit = defineEmits<{
  upload: [file: File]
}>()

defineProps<{
  loading?: boolean
}>()

const isDragging = ref(false)
const fileInput = ref<HTMLInputElement>()

const FORMAT_GROUPS = [
  { label: 'Documents', formats: ['PDF', 'DOCX', 'PPTX', 'XLSX', 'XLS', 'EPUB', 'MSG'] },
  { label: 'Web & Data', formats: ['HTML', 'CSV', 'JSON', 'XML', 'IPYNB'] },
  { label: 'Media', formats: ['JPG', 'PNG', 'WAV', 'MP3'] },
  { label: 'Other', formats: ['ZIP'] },
]

const MAX_SIZE_MB = 50
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) processFile(file)
}

function handleFileSelect(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) processFile(file)
  input.value = ''
}

function processFile(file: File) {
  if (file.size > MAX_SIZE_BYTES) {
    alert(`File size exceeds ${MAX_SIZE_MB}MB limit.`)
    return
  }
  emit('upload', file)
}

function triggerFileInput() {
  fileInput.value?.click()
}
</script>

<template>
  <div
    class="file-upload"
    :class="{ dragging: isDragging, disabled: loading }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    @click="triggerFileInput"
  >
    <input
      ref="fileInput"
      type="file"
      class="file-input-hidden"
      @change="handleFileSelect"
      :disabled="loading"
    />

    <div class="upload-content">
      <div class="upload-icon">
        <Loader v-if="loading" :size="32" class="spin" />
        <Upload v-else-if="isDragging" :size="32" />
        <FileText v-else :size="32" />
      </div>

      <div class="upload-text">
        <p class="upload-title">
          {{ loading ? 'Converting...' : 'Drop your file here' }}
        </p>
        <p v-if="!loading" class="upload-subtitle">or click to browse</p>
      </div>

      <div v-if="!loading" class="format-groups">
        <div v-for="group in FORMAT_GROUPS" :key="group.label" class="format-group">
          <span class="format-group-label">{{ group.label }}</span>
          <div class="format-list">
            <FormatBadge
              v-for="fmt in group.formats"
              :key="fmt"
              :label="fmt"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.file-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  padding: 40px 24px;
  border: 2px dashed var(--color-drop-zone-border);
  border-radius: 4px;
  background-color: var(--color-drop-zone-bg);
  cursor: pointer;
  transition: border-color 0.33s, background-color 0.33s;
}

.file-upload:hover,
.file-upload.dragging {
  border-color: var(--color-drop-zone-active-border);
  background-color: var(--color-drop-zone-active-bg);
}

.file-upload.disabled {
  cursor: default;
  pointer-events: none;
  opacity: 0.7;
}

.file-input-hidden {
  display: none;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.upload-icon {
  color: var(--color-text-tertiary);
  transition: color 0.33s;
}

.file-upload:hover .upload-icon,
.file-upload.dragging .upload-icon {
  color: var(--color-primary);
}

.upload-title {
  font-size: 17px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.upload-subtitle {
  margin-top: 4px;
  font-size: 14px;
  color: var(--color-text-tertiary);
}

.format-groups {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 480px;
}

.format-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.format-group-label {
  flex-shrink: 0;
  width: 80px;
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-tertiary);
  text-align: right;
  white-space: nowrap;
}

.format-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 1s linear infinite;
}
</style>
