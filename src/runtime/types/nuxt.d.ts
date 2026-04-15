// types/nuxt.d.ts
import type { useRevealManager } from "../utils/useManager";

declare module "#app" {
  interface NuxtApp {
    $reveal: ReturnType<typeof useRevealManager>;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $reveal: ReturnType<typeof useRevealManager>;
  }
}
