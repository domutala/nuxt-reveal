import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { revealDirective, revealDirectiveGroup } from "../directives/reveal";
import { useRevealManager } from "../utils/useManager";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const manager = useRevealManager(config);

  nuxtApp.vueApp.directive("reveal", revealDirective);
  nuxtApp.vueApp.directive("reveal-group", revealDirectiveGroup);
  nuxtApp.provide("reveal", manager);
});
