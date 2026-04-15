# nuxt-reveal

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

**nuxt-reveal** est un module Nuxt 3 qui permet d’animer facilement les éléments lorsqu’ils apparaissent dans le viewport (scroll reveal), basé sur `IntersectionObserver`.

Compatible avec n’importe quelle librairie d’animation comme `Animate.css`, ou même des animations CSS custom.

---

* [✨  Release Notes](/CHANGELOG.md)

---

# Features

* Basé sur `IntersectionObserver` (performant et natif)
* Compatible avec Animate.css, Tailwind, CSS custom
* API simple via directive `v-reveal`
* Support du stagger (animations en cascade)
* Support des groupes (`v-reveal-group`)
* Delay par élément via `data-delay`
* Support `once` ou animations réversibles
* Zéro dépendance externe
* SSR safe (Nuxt 3)

---

# 📦 Installation

```bash
npx nuxt module add nuxt-reveal
````

---

# ⚙️ Utilisation

## 1. Directive `v-reveal`

La directive est automatiquement enregistrée.

### Exemple simple

```vue
<template>
  <div
    v-reveal
    enter-active-class="animate__animated animate__fadeInUp"
  >
    Hello 👋
  </div>
</template>
```

---

## 2. Avec options

```vue
<script setup lang="ts">
const reveal = {
  once: true,
  threshold: 0.2,
};
</script>

<template>
  <div
    v-reveal="reveal"
    enter-active-class="animate__animated animate__fadeInUp"
    leave-active-class="animate__fadeOut"
  >
    Animated element
  </div>
</template>
```

---

# Animations en groupe (stagger)

Permet d’animer plusieurs éléments en cascade (effet "stagger").

## Exemple

```vue
<template>
  <div v-reveal-group>
    <div reveal-item enter-active-class="fade-in">Item 1</div>
    <div reveal-item enter-active-class="fade-in">Item 2</div>
    <div reveal-item enter-active-class="fade-in">Item 3</div>
  </div>
</template>
```

👉 Tous les éléments avec `reveal-item` seront animés avec un délai progressif.

---

## ⚙️ Configuration du stagger

Dans `nuxt.config.ts` :

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      reveal: {
        stagger: 100, // 100ms entre chaque élément
      },
    },
  },
});
```

---

## 🎯 Stagger avancé

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      reveal: {
        stagger: {
          delay: 80,
          from: "center", // "start" | "center" | "end"
        },
      },
    },
  },
});
```

### Options disponibles

| Option    | Description                |
| --------- | -------------------------- |
| `start`   | animation de haut en bas   |
| `end`     | animation de bas en haut   |
| `center`  | animation depuis le centre |
| `reverse` | inverse l’ordre            |
| `random`  | ordre pseudo-aléatoire     |

---

# ⏱️ Delay par élément

Tu peux override le delay individuellement :

```vue
<template>
  <div v-reveal-group>
    <div reveal-item data-delay="0">Item 1</div>
    <div reveal-item data-delay="200">Item 2</div>
    <div reveal-item data-delay="400ms">Item 3</div>
  </div>
</template>
```

👉 Supporte :

* `200` → converti en `200ms`
* `200ms`
* `0.3s`

---

# 🎨 Intégration avec Animate.css

## Installation

```bash
yarn add animate.css
```

## Configuration Nuxt

```ts
export default defineNuxtConfig({
  css: ["animate.css"],
});
```

## Exemple

```vue
<template>
  <div
    v-reveal
    enter-active-class="animate__animated animate__fadeInUp"
    leave-active-class="animate__fadeOut"
  >
    Smooth animation 🚀
  </div>
</template>
```

---

# 🧠 API

## Directive: `v-reveal`

### Options

| Option       | Type    | Default | Description                         |
| ------------ | ------- | ------- | ----------------------------------- |
| `once`       | boolean | false   | Animation une seule fois            |
| `threshold`  | number  | 0.1     | % de visibilité avant déclenchement |
| `rootMargin` | string  | "0px"   | marge autour du viewport            |

---

## Directive: `v-reveal-group`

Permet d’animer un groupe d’éléments avec effet stagger.

### Utilisation

```vue
<div v-reveal-group>
  <div reveal-item>Item</div>
</div>
```

---

## Attributs HTML

| Attribut             | Description                      |
| -------------------- | -------------------------------- |
| `enter-active-class` | Classes ajoutées à l’entrée      |
| `leave-active-class` | Classes ajoutées à la sortie     |
| `reveal-item`        | Marque un élément dans un groupe |
| `data-delay`         | Override du delay                |

---

# 💡 Exemples avancés

## Animation custom CSS

```vue
<template>
  <div
    v-reveal
    enter-active-class="fade-in"
    leave-active-class="fade-out"
  >
    Custom animation
  </div>
</template>

<style>
.fade-in {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s ease;
}

.fade-out {
  opacity: 0;
  transform: translateY(40px);
}
</style>
```

---

## Exemple avec stagger

```vue
<template>
  <section v-reveal-group>
    <div
      v-for="item in 6"
      :key="item"
      reveal-item
      class="card"
      enter-active-class="opacity-100 translate-y-0"
      leave-active-class="opacity-0 translate-y-6"
    >
      Card {{ item }}
    </div>
  </section>
</template>

<style>
.card {
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.5s ease;
}
</style>
```

---

# ⚡ Bonnes pratiques

* Utiliser `transform` et `opacity` (GPU friendly)
* Éviter trop d’éléments dans un même groupe (> 100)
* Préférer `once: true` pour les sections statiques
* Utiliser `stagger` pour améliorer la perception UX

> ℹ️ Les classes d’animation doivent inclure leurs propres transitions CSS (`transition`, `duration`, etc.)

---

# 🧪 Compatibilité

* ✅ Nuxt 3
* ✅ SSR safe
* ✅ Navigateurs modernes (IntersectionObserver)

---

# 🤝 Contribution

<details>
  <summary>Local development</summary>

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm dev:prepare

# Develop with the playground
pnpm dev

# Build the playground
pnpm dev:build

# Run ESLint
pnpm lint

# Run tests
pnpm test
pnpm test:watch

# Release new version
pnpm release
```

</details>

---

# 📄 License

MIT

---

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-reveal/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-reveal
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-reveal.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-reveal
[license-src]: https://img.shields.io/npm/l/nuxt-reveal.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-reveal
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
