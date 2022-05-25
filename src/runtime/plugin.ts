import NProgress from 'nprogress'
// @ts-expect-error: Resolved by Nuxt
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

// @ts-expect-error: Resolved by Nuxt
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public.progress

  nuxtApp.hook('app:mounted', () => {
    if (Object.keys(config.options).length > 0)
      NProgress.configure(config.options)

    nuxtApp.hook('page:start', () => {
      NProgress.start()
    })

    nuxtApp.hook('page:finish', () => {
      NProgress.done()
    })
  })
})
