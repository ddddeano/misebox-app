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
  ],
  // ssr: true,
  target: 'server',
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.firebase_api_key,
    },
  },
  modules: ['@vueuse/nuxt', '@pinia/nuxt', 'nuxt-icon'],
  imports: {
    dirs: ['stores', 'composables', 'types'],
  },
});
