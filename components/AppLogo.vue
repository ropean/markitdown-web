<script setup lang="ts">
defineProps<{
  size?: number
}>()
</script>

<template>
  <div class="app-logo">
    <svg
      :width="size ?? 32"
      :height="size ?? 32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Document shape -->
      <rect
        x="4"
        y="2"
        width="24"
        height="28"
        rx="3"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
      />
      <!-- M letter formed by lines -->
      <path
        d="M10 22V12L16 18L22 12V22"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <!-- Down arrow (conversion) -->
      <line
        x1="16"
        y1="6"
        x2="16"
        y2="10"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
      <polyline
        points="13,8 16,11 19,8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </svg>
    <span class="app-logo-text">MarkItDown</span>
  </div>
</template>

<style scoped>
.app-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-primary);
  user-select: none;
}

.app-logo-text {
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.01em;
}
</style>
