export type RevealPreset =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "slide-up"
  | "slide-down"
  | "zoom-in"
  | "zoom-out";

export interface PresetConfig {
  enter: string[];
  leave: string[];
}

export const presets: Record<RevealPreset, PresetConfig> = {
  fade: {
    enter: ["nr-fade-in"],
    leave: ["nr-fade-out"],
  },
  "fade-up": {
    enter: ["nr-fade-up-in"],
    leave: ["nr-fade-up-out"],
  },
  "fade-down": {
    enter: ["nr-fade-down-in"],
    leave: ["nr-fade-down-out"],
  },
  "slide-up": {
    enter: ["nr-slide-up-in"],
    leave: ["nr-slide-up-out"],
  },
  "slide-down": {
    enter: ["nr-slide-down-in"],
    leave: ["nr-slide-down-out"],
  },
  "zoom-in": {
    enter: ["nr-zoom-in"],
    leave: ["nr-zoom-out"],
  },
  "zoom-out": {
    enter: ["nr-zoom-out"],
    leave: ["nr-zoom-in"],
  },
};
