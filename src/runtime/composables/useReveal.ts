// composables/useReveal.ts
import { onMounted, onBeforeUnmount, ref, type Ref } from "vue";
import { useNuxtApp } from "#app";
import type { RevealOptions } from "../utils/useManager";

export function useReveal(
  el: Ref<HTMLElement | null | undefined>,
  options?: RevealOptions
) {
  const nuxtApp = useNuxtApp();

  onMounted(() => {
    if (el.value) {
      nuxtApp.$reveal.observe(el.value, options);
    }
  });

  onBeforeUnmount(() => {
    if (el.value) {
      nuxtApp.$reveal.unobserve(el.value);
    }
  });

  return { el };
}
