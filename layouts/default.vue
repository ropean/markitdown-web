<template>
  <div class="app-layout">
    <AppHeader />
    <main class="app-main">
      <slot />
    </main>
    <footer class="app-footer">
      <p>
        Powered by
        <a
          href="https://github.com/microsoft/markitdown"
          target="_blank"
          rel="noopener noreferrer"
        >
          MarkItDown
        </a>
        ·
        <a
          href="https://github.com/ropean/markitdown-web"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source
        </a>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
  overflow-y: auto;
}

.app-footer {
  padding: 24px;
  text-align: center;
  font-size: 13px;
  color: var(--color-text-tertiary);
  border-top: 1px solid var(--color-border);
  transition: border-color 0.33s, color 0.33s;
}

.app-footer a {
  color: var(--color-text-secondary);
  font-weight: 500;
}

.app-footer a:hover {
  color: var(--color-primary);
}
</style>
