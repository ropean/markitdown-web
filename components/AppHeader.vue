<script setup lang="ts">
import { Github } from 'lucide-vue-next'
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <AppLogo />
      <div class="header-actions">
        <a
          href="https://github.com/ropean/markitdown-web"
          rel="noopener noreferrer"
          class="header-link"
          aria-label="GitHub repository"
        >
          <Github :size="18" />
        </a>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.33s, border-color 0.33s;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
  padding: 12px 24px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  color: var(--color-text-secondary);
  transition: background-color 0.33s, color 0.33s;
  text-decoration: none;
}

.header-link:hover {
  background-color: var(--color-bg-alt);
  color: var(--color-text-primary);
  text-decoration: none;
}
</style>
