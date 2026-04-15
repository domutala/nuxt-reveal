import type { RuntimeConfig } from 'nuxt/schema'
import { presets, type PresetConfig, type RevealPreset } from './presets'
import type { ModuleOptions } from '~/src/module'

export interface RevealOptions {
  preset?: RevealPreset
  once?: boolean
  threshold?: number
  rootMargin?: string
  group?: true
}

interface InternalOptions extends RevealOptions {
  enterClasses: string[]
  leaveClasses: string[]
}

const elementMap = new WeakMap<HTMLElement, InternalOptions>()
const observerPool = new Map<string, IntersectionObserver>()

function getObserverKey(options: RevealOptions) {
  return `${options.threshold}-${options.rootMargin}`
}

function seededRandom(seed: number) {
  return Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000)
}

function resolveStagger(stagger: ModuleOptions['stagger'], index: number, total: number): number {
  if (typeof stagger === 'number') {
    return index * stagger
  }

  const delay = stagger.delay ?? 80

  if (stagger.from) {
    switch (stagger.from) {
      case 'start':
        return index * delay

      case 'end':
        return (total - index - 1) * delay

      case 'center': {
        const middle = (total - 1) / 2
        return Math.abs(index - middle) * delay
      }
    }
  }

  const direction = stagger.direction ?? 'normal'

  switch (direction) {
    case 'reverse':
      return (total - index - 1) * delay

    case 'center': {
      const middle = (total - 1) / 2
      return Math.abs(index - middle) * delay
    }
    case 'random': {
      const rand = seededRandom(index + total)
      return rand * delay * total
    }
    default:
      return index * delay
  }
}

function createObserver(options: RevealOptions, runtimeConfig: RuntimeConfig) {
  return new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        const config = elementMap.get(el)
        if (!config) continue

        const isVisible = entry.isIntersecting
        const staggerConfig = runtimeConfig.public?.reveal?.stagger ?? 80

        let els = [el]
        if (config.group) {
          els = Array.from(el.querySelectorAll<HTMLElement>('[reveal-item]'))
        }

        const total = els.length

        if (isVisible) {
          els.forEach((child, index) => {
            if (config.once && child.dataset.revealed === 'true') return

            child.classList.remove(...config.enterClasses, ...config.leaveClasses)

            const rawDelay = child.getAttribute('data-delay')

            const delay =
              rawDelay !== null
                ? rawDelay.endsWith('s')
                  ? rawDelay
                  : `${rawDelay}ms`
                : `${resolveStagger(staggerConfig, index, total)}ms`

            child.style.transitionDelay = delay
            child.classList.add(...config.enterClasses)
            child.dataset.revealed = 'true'
          })

          if (config.once) {
            const observer = observerPool.get(getObserverKey(options))
            observer?.unobserve(el)
          }
        } else {
          if (!config.once) {
            els.forEach((child) => {
              child.classList.remove(...config.enterClasses, ...config.leaveClasses)

              child.style.transitionDelay = '0ms'
              child.classList.add(...config.leaveClasses)
            })
          }
        }
      }
    },
    {
      threshold: options.threshold,
      rootMargin: options.rootMargin,
    },
  )
}

function parseOptions(options: RevealOptions | string): RevealOptions {
  if (typeof options === 'string') {
    return { preset: options as RevealPreset }
  }

  return options
}

export function useRevealManager(runtimeConfig: RuntimeConfig) {
  const globalPresets = {
    ...presets,
    ...runtimeConfig.public?.reveal?.presets,
  } as Record<RevealPreset, PresetConfig>

  function observe(el: HTMLElement, options: RevealOptions | string = {}) {
    const config: RevealOptions = {
      once: false,
      threshold: 0.1,
      rootMargin: '0px',
      ...parseOptions(options),
    }

    const key = getObserverKey(config)

    if (!observerPool.has(key)) {
      observerPool.set(key, createObserver(config, runtimeConfig))
    }

    const observer = observerPool.get(key)!
    const preset = config.preset ? globalPresets[config.preset] : null

    const enterClasses =
      el.getAttribute('enter-active-class')?.split(' ').filter(Boolean) || preset?.enter || []

    const leaveClasses =
      el.getAttribute('leave-active-class')?.split(' ').filter(Boolean) || preset?.leave || []

    elementMap.set(el, {
      ...config,
      enterClasses,
      leaveClasses,
    })

    observer.observe(el)
  }

  function observeGroup(el: HTMLElement, options: RevealOptions | string = {}) {
    options = parseOptions(options)
    options.group = true

    observe(el, options)
  }

  function unobserve(el: HTMLElement) {
    const config = elementMap.get(el)
    if (!config) return

    const key = getObserverKey(config)
    const observer = observerPool.get(key)

    observer?.unobserve(el)
    elementMap.delete(el)
  }

  return { observe, observeGroup, unobserve }
}
