// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "firebase",
  },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "nuxt-icon"],
  imports: {
    dirs: ["stores", "composables"],
  },
});
