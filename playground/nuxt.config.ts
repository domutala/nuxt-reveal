export default defineNuxtConfig({

  modules: ["nuxt-reveal"],
  devtools: { enabled: true },
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
  compatibilityDate: "latest",

  reveal: {
    presets: {
      test: { enter: [], leave: [] },
    },
  },
});
