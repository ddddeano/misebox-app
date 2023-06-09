// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'firebase',
  },
  css: [
    '@/assets/styles/colorTheme1.scss',
    '@/assets/styles/defaults.scss',
    '@/assets/styles/global.scss',
    '@/assets/styles/application.scss',
    '@/assets/styles/layout.scss',
  ],
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore', 'definePiniaStore'] }],
  ],
  // ssr: true,
  target: 'server',
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.firebase_api_key,
      apiUrl:
        process.env.NODE_ENV === 'production'
          ? 'https://misebox.app'
          : 'http://localhost:3000',
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-icon',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  imports: {
    dirs: ['stores', 'composables'],
  },
});
