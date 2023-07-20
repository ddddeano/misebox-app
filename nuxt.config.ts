// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'firebase',
  },
  css: [
    '@/assets/styles/variables.scss',
    '@/assets/styles/global.scss',
    '@/assets/styles/layout.scss',
  ],

  // ssr: true,
  target: 'server',
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.firebase_api_key,
      stripePublicKey:
        process.env.NODE_ENV === 'production'
          ? process.env.STRIPE_LIVE_PUBLIC_KEY
          : process.env.STRIPE_TEST_PUBLIC_KEY,

      apiUrl:
        process.env.NODE_ENV === 'production'
          ? 'https://misebox.app'
          : 'http://localhost:3000',
    },
    private: {
      stripePrivateKey:
        process.env.NODE_ENV === 'production'
          ? process.env.STRIPE_LIVE_PRIVATE_KEY
          : process.env.STRIPE_TEST_PRIVATE_KEY,
    },
  },
  modules: [
    '@vueuse/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'definePiniaStore'] }],
    'nuxt-icon',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  imports: {
    dirs: ['stores', 'composables'],
  },
});
