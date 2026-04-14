// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: false },

  modules: ['@nuxtjs/color-mode'],

  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: '-mode',
    preference: 'system',
    fallback: 'light',
    storageKey: 'color-mode',
    storage: 'cookie',
  },

  app: {
    head: {
      title: 'MarkItDown',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Upload a file or paste a URL to convert it to Markdown instantly.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
