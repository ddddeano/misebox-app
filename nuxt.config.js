// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.firebase_api_key, // Aligned with the good app
      stripePublicKey: process.env.NODE_ENV === 'production'
        ? process.env.STRIPE_LIVE_PUBLIC_KEY
        : process.env.STRIPE_TEST_PUBLIC_KEY,
      apiUrl: process.env.NODE_ENV === 'production'
        ? 'https://misebox.app'
        : 'http://localhost:3000',
    },
    private: {
      stripePrivateKey: process.env.NODE_ENV === 'production'
        ? process.env.STRIPE_LIVE_PRIVATE_KEY
        : process.env.STRIPE_TEST_PRIVATE_KEY,
    },
  },
  devtools: { enabled: true },
  imports: {
    dirs: [
      'composables/**',
      'composables/**',
      'components/**',
      'stores/**', // Add this line

      ...(process.env.NODE_ENV !== 'production' ? ['data/dummy'] : []),
    ],
  },
  modules: [
    '@vueuse/nuxt', '@pinia/nuxt',
  ],
  plugins: [
    '~/plugins/firebase.client.js',
  ],
});
