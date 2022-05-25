import { defu } from 'defu'
import type { NProgressOptions } from 'nprogress'
import { addPlugin, createResolver, defineNuxtModule, extendViteConfig } from '@nuxt/kit'

export interface ModuleOptions {
  height: string
  color: string
  options: Partial<NProgressOptions>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-progress',
    configKey: 'progress',
  },
  defaults: {
    height: '2px',
    color: '#29D',
    options: {},
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.css.push('nprogress/nprogress.css')

    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.include.push('nprogress')
    })

    addPlugin(resolve('./runtime/plugin'))

    nuxt.options.runtimeConfig.public.progress = defu(nuxt.options.runtimeConfig.public.progress, {
      height: options.height,
      color: options.color,
      options: options.options,
    })
  },
})

