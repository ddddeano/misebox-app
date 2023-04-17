// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "firebase",
  },
  ssr: true,
  target: "server",
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.firebase_api_key,
    },
  },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "nuxt-icon"],
  imports: {
    dirs: ["stores", "composables"],
  },
});
