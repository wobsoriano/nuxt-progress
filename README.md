# nuxt-progress

Nuxt already has a built-in [`<NuxtLoadingIndicator />`](https://nuxt.com/docs/api/components/nuxt-loading-indicator) component.

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
