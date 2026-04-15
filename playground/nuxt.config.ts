export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
      ],
    },
  },

  modules: ["nuxt-reveal"],
  devtools: { enabled: true },
  compatibilityDate: "latest",

  reveal: {
    presets: {
      test: { enter: [], leave: [] },
    },
  },
});
