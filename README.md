# nuxt-reveal

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

**nuxt-reveal** is a Nuxt 3 module that makes it easy to animate elements when they enter the viewport (scroll reveal), based on `IntersectionObserver`.

Compatible with any animation library like [animate.css](https://animate.style/), or even custom CSS animations.

* [✨ Release Notes](/CHANGELOG.md)

---

# Features

* Based on `IntersectionObserver` (native and performant)
* Compatible with Animate.css, Tailwind, and custom CSS
* Simple API via the `v-reveal` directive
* Stagger support (sequential animations)
* Group support (`v-reveal-group`)
* Per-element delay via `data-delay`
* Supports `once` or reversible animations
* Zero external dependencies
* SSR safe (Nuxt 3)

---

# 📦 Installation

```bash
npx nuxt module add nuxt-reveal
```

---

# Usage

## 1. `v-reveal` Directive

The directive is automatically registered.

### Basic example

```vue
<template>
  <div
    v-reveal
    enter-active-class="fade-in"
    leave-active-class="fade-out"
  >
    Hello 👋
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

## 2. With options

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
    enter-active-class="fade-in"
    leave-active-class="fade-out"
  >
    Animated element
  </div>
</template>
```

---

# Group animations (stagger)

Allows multiple elements to be animated sequentially (stagger effect).

## Example

```vue
<template>
  <div v-reveal-group enter-active-class="fade-in">
    <div reveal-item>Item 1</div>
    <div reveal-item>Item 2</div>
    <div reveal-item>Item 3</div>
  </div>
</template>
```

👉 All elements with `reveal-item` will be animated with a progressive delay.

---

## Stagger configuration

In `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      reveal: {
        stagger: 100, // 100ms between each element
      },
    },
  },
});
```

---

## Advanced stagger

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

### Available options

| Option    | Description                  |
| --------- | ---------------------------- |
| `start`   | animation from top to bottom |
| `end`     | animation from bottom to top |
| `center`  | animation from center        |
| `reverse` | reverse order                |
| `random`  | pseudo-random order          |

---

# Per-element delay

You can override the delay individually:

```vue
<template>
  <div v-reveal-group>
    <div reveal-item data-delay="0">Item 1</div>
    <div reveal-item data-delay="200">Item 2</div>
    <div reveal-item data-delay="400ms">Item 3</div>
  </div>
</template>
```

👉 Supports:

* `200` → converted to `200ms`
* `200ms`
* `0.3s`

---

# Integration with [animate.css](https://animate.style/)

## Installation

```bash
yarn add animate.css
```

## Nuxt configuration

```ts
export default defineNuxtConfig({
  css: ["animate.css"],
});
```

## Example

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

# API

## Directive: `v-reveal`

### Options

| Option       | Type    | Default | Description                    |
| ------------ | ------- | ------- | ------------------------------ |
| `once`       | boolean | false   | Animate only once              |
| `threshold`  | number  | 0.1     | Visibility % before triggering |
| `rootMargin` | string  | "0px"   | Margin around the viewport     |

---

## Directive: `v-reveal-group`

Allows animating a group of elements with a stagger effect.

### Usage

```vue
<div v-reveal-group>
  <div reveal-item>Item</div>
</div>
```

---

## HTML Attributes

| Attribute            | Description                  |
| -------------------- | ---------------------------- |
| `enter-active-class` | Classes applied on enter     |
| `leave-active-class` | Classes applied on leave     |
| `reveal-item`        | Marks an item inside a group |
| `data-delay`         | Delay override               |

---

# Advanced examples

## Custom CSS animation

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

## Example with stagger

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

# Best practices

* Use `transform` and `opacity` (GPU-friendly)
* Avoid too many elements in the same group (> 100)
* Prefer `once: true` for static sections
* Use `stagger` to improve UX perception

> Animation classes must include their own CSS transitions (`transition`, `duration`, etc.)

---

# Compatibility

* ✅ Nuxt 3
* ✅ SSR safe
* ✅ Modern browsers (IntersectionObserver)

---

# Contribution

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

# License

MIT
