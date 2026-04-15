// types/nuxt.d.ts
import type { ModuleOptions } from '~/src/module'
import type { useRevealManager } from '../utils/useManager'

declare module '#app' {
  interface NuxtApp {
    $reveal: ReturnType<typeof useRevealManager>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $reveal: ReturnType<typeof useRevealManager>
  }
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    reveal: ModuleOptions
  }
}
