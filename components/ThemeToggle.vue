<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const colorMode = useColorMode()

function toggle() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    class="theme-toggle"
    :aria-label="
      colorMode.value === 'dark'
        ? 'Switch to light mode'
        : 'Switch to dark mode'
    "
    @click="toggle"
  >
    <Transition name="icon-fade" mode="out-in">
      <Moon v-if="colorMode.value === 'dark'" :size="18" key="moon" />
      <Sun v-else :size="18" key="sun" />
    </Transition>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  color: var(--color-text-secondary);
  transition: background-color 0.33s, color 0.33s;
}

.theme-toggle:hover {
  background-color: var(--color-bg-alt);
  color: var(--color-text-primary);
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: opacity 0.2s ease;
}

.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
}
</style>
