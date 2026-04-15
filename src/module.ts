import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports,
} from "@nuxt/kit";
import type { PresetConfig } from "./runtime/utils/presets";

// Module options TypeScript interface definition
export interface ModuleOptions {
  presets: Record<string, PresetConfig>;
  stagger:
    | number
    | {
        delay?: number;
        direction: "normal" | "reverse" | "center" | "random";
        from: "center" | "start" | "end";
      };
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-reveal",
    configKey: "reveal",
  },
  // Default configuration options of the Nuxt module
  defaults: { presets: {}, stagger: 80 },

  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    _options.presets;

    _nuxt.options.runtimeConfig.public.reveal = _options;

    addPlugin(resolver.resolve("./runtime/plugins/reveal.client"));
    addImports({
      name: "useReveal",
      from: resolver.resolve("./runtime/composables/useReveal.ts"),
    });

    _nuxt.options.css.push(resolver.resolve("./runtime/assets/styles.css"));
  },
});
