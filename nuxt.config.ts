// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.firebase_api_key,
    },
  },
  nitro: {
    preset: "firebase",
  },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "nuxt-icon"],
  imports: {
    dirs: ["stores", "composables"],
  },
});
