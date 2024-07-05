// frontend/nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:8000/api",
    },
  },

  compatibilityDate: "2024-07-05",

  plugins: ["~/plugins/pinia.js", "~/plugins/axios.js"],
});
