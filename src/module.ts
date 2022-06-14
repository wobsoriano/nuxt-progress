import { defu } from 'defu'
import type { NProgressOptions } from 'nprogress'
import { addPlugin, createResolver, defineNuxtModule, extendViteConfig } from '@nuxt/kit'
import dedent from 'dedent'

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
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const styles = dedent`
    #nprogress {
      pointer-events: none;
    }
    #nprogress .bar {
      background: ${options.color};
      position: fixed;
      z-index: 99999;
      top: 0;
      left: 0;
      width: 100%;
      height: ${typeof options.height === 'string' ? options.height : `${options.height}px`};
    }
    /* Fancy blur effect */
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px ${options.color}, 0 0 5px ${options.color};
      opacity: 1.0;
      -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
    }
    /* Remove these to get rid of the spinner */
    #nprogress .spinner {
      display: block;
      position: fixed;
      z-index: 99999;
      top: 15px;
      right: 15px;
    }
    #nprogress .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;
      border: solid 2px transparent;
      border-top-color: ${options.color};
      border-left-color: ${options.color};
      border-radius: 50%;
      -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
    }
    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }
    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }
    @-webkit-keyframes nprogress-spinner {
      0%   { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes nprogress-spinner {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }`

    nuxt.options.app.head.style = nuxt.options.app.head.style || []
    nuxt.options.app.head.style.push({
      children: styles,
    })

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

