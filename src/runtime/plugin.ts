import NProgress from 'nprogress'
// @ts-expect-error: Resolved by Nuxt
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

function updateHeight(height: string | number) {
  const barEl = document.querySelector('#nprogress .bar') as HTMLElement
  barEl.style.height = typeof height === 'string' ? height : `${height}px`
}

function updateColor(color: string) {
  const pegEl = document.querySelector('#nprogress .peg') as HTMLElement
  const spinnerEl = document.querySelector('#nprogress .spinner-icon') as HTMLElement
  // @ts-expect-error: Internal
  pegEl.style['box-shadow'] = `0 0 10px ${color}, 0 0 5px ${color}`
  // @ts-expect-error: Internal
  spinnerEl.style['border-top-color'] = color
  // @ts-expect-error: Internal
  spinnerEl.style['border-left-color'] = color
}

// @ts-expect-error: Resolved by Nuxt
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.progress

  nuxtApp.hook('app:mounted', () => {
    config.options && NProgress.configure(config.options)

    updateHeight(config.height)
    updateColor(config.color)

    nuxtApp.hook('page:start', () => {
      NProgress.start()
    })

    nuxtApp.hook('page:finish', () => {
      NProgress.done()
    })

    nuxtApp.hook('app:error', () => {
      // TODO: Check correct error hook
      updateColor('red')
      NProgress.done()
    })

    nuxtApp.hook('vue:error', () => {
      // TODO: Check correct error hook
      updateColor('red')
      NProgress.done()
    })
  })
})
