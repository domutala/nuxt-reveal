import type { ObjectDirective, DirectiveBinding } from "vue";
import type { RevealOptions } from "../utils/useManager";
import { useNuxtApp } from "#app";

export const revealDirective: ObjectDirective = {
  getSSRProps() {
    return {};
  },

  mounted(el: HTMLElement, binding: DirectiveBinding<RevealOptions>) {
    const nuxtApp = useNuxtApp();
    nuxtApp.$reveal.observe(el, binding.value);
  },

  unmounted(el: HTMLElement) {
    const nuxtApp = useNuxtApp();
    nuxtApp.$reveal.unobserve(el);
  },
};

export const revealDirectiveGroup: ObjectDirective = {
  getSSRProps() {
    return {};
  },

  mounted(el: HTMLElement, binding: DirectiveBinding<RevealOptions>) {
    const nuxtApp = useNuxtApp();
    nuxtApp.$reveal.observeGroup(el, binding.value);
  },

  // unmounted(el: HTMLElement) {
  //   const nuxtApp = useNuxtApp();
  //   nuxtApp.$reveal.unobserve(el);
  // },
};
