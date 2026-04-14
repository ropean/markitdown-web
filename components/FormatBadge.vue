<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="format-badge">{{ label }}</span>
</template>

<style scoped>
.format-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-badge-text);
  background-color: var(--color-badge-bg);
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: background-color 0.33s, color 0.33s;
}
</style>
