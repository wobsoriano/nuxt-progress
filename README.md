# nuxt-progress

[![Version](https://img.shields.io/npm/v/nuxt-progress?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/nuxt-progress) ![NPM](https://img.shields.io/npm/l/nuxt-progress?style=flat&colorA=000000&colorB=000000)

Show a progress bar between routes.

## Installation

```bash
npm install nuxt-progress
```

## Usage

```ts
export default defineNuxtConfig({
  modules: ['nuxt-progress'],
  progress: {
    // Default: 2px
    height: '2px',
    // Default: #29D
    color: '#29D',
    // NProgress options: https://www.npmjs.com/package/nprogress#configuration
    options: {
      showSpinner: true
    }
  }
})
```

## License

MIT
