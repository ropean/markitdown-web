<script setup lang="ts">
import { Link, ArrowRight, Loader } from 'lucide-vue-next'

const emit = defineEmits<{
  submit: [url: string]
}>()

defineProps<{
  loading?: boolean
}>()

const url = ref('')

function handleSubmit() {
  const trimmed = url.value.trim()
  if (!trimmed) return
  emit('submit', trimmed)
}
</script>

<template>
  <form class="url-input" @submit.prevent="handleSubmit">
    <div class="url-field">
      <Link :size="16" class="url-icon" />
      <input
        v-model="url"
        type="url"
        class="url-text"
        :disabled="loading"
      />
      <button
        type="submit"
        class="url-submit"
        :disabled="!url.trim() || loading"
        aria-label="Convert URL"
      >
        <Loader v-if="loading" :size="16" class="spin" />
        <ArrowRight v-else :size="16" />
      </button>
    </div>
  </form>
</template>

<style scoped>
.url-input {
  width: 100%;
}

.url-field {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 2px solid var(--color-border-strong);
  border-radius: 4px;
  background-color: var(--color-bg-elevated);
  transition: border-color 0.33s, background-color 0.33s;
}

.url-field:focus-within {
  border-color: var(--color-primary);
}

.url-icon {
  flex-shrink: 0;
  color: var(--color-placeholder);
}

.url-text {
  flex: 1;
  border: none;
  outline: none;
  background: none;
  font-family: inherit;
  font-size: 14px;
  color: var(--color-text-primary);
}

.url-text::placeholder {
  color: var(--color-placeholder);
}

.url-submit {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  transition: background-color 0.33s, opacity 0.33s;
}

.url-submit:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.url-submit:disabled {
  opacity: 0.4;
  cursor: default;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 1s linear infinite;
}
</style>
