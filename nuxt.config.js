import config from './configs'

const { locale, availableLocales, fallbackLocale } = config.locales
export default {


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Recepies',
    title: 'Recepies',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // router: {
  //   middleware: ['auth']
  // },

  plugins: [
    '~/plugins/axios',
    '~/plugins/helpers.ts',
    { src: '~/plugins/vue-unicon.js', mode: 'client' },
    { src: '~/plugins/apexcharts.js', mode: 'client' },
    { src: '~/plugins/clipboard.js', mode: 'client' },
    { src: '~plugins/vuex-persistedstate.js' },
    // Filters
    { src: '~/filters/capitalize.js' },
    { src: '~/filters/lowercase.js' },
    { src: '~/filters/uppercase.js' },
    { src: '~/filters/formatCurrency.js' },
    { src: '~/filters/formatDate.js' }
  ],
  // Global CSS
  css: [
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],

  // Modules
  modules: [
    'nuxt-speedkit',
    '@nuxtjs/toast',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios', '@nuxtjs/i18n',
    'cookie-universal-nuxt',
  ],

  axios: {
    proxy: true,
    proxyHeaders: false
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8000/api',
      pathRewrite: { '^/api': '' }
    }
  },

  router: {
    middleware: ['auth']
  },

  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    },
    locales: availableLocales,
    lazy: true,
    langDir: 'translations/',
    defaultLocale: locale,
    vueI18n: {
      fallbackLocale
    }
  },

  auth: {
    redirect: {
      login: "/auth/login"
    },
    strategies: {
      local: false,
      cookie: {

        token: {
          required: true,
        },
        user: {
          property: false,//"data",
        },
        endpoints: {
          login: {
            url: "/api/auth/login",
            method: "post",
          },
          logout: { url: "/api/auth/logout", method: "post" },
          user: { url: "/api/user/me", method: "get" },
        },

      },
    },
  },

  // Axios module
  axios: {
    // baseURL: 'http://localhost:8000/api',
    credentials: true,
    proxy: true
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  // Vuetify module
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/configs/vuetify.js',
    defaultAssets: {
      font: false
    },

    treeShake: true,
  },

  speedkit: {
    // detection: {
    //   performance: true,
    //   browserSupport: true
    // },
    // performanceMetrics: {
    //   device: {
    //     hardwareConcurrency: { min: 2, max: 48 },
    //     deviceMemory: { min: 2 }
    //   },
    //   timing: {
    //     fcp: 800,
    //     dcl: 1200
    //   },
    //   lighthouseDetectionByUserAgent: false
    // },

    fonts: [{
      family: 'Poppins',
      locals: ['Poppins'],
      fallback: ['Roboto', 'sans-serif'],
      variances: [
        {
          style: 'normal',
          weight: 100,
          sources: [
            { src: '~/assets/fonts/poppins/Poppins-Thin.ttf', type: 'truetype' },
          ]
        },
        {
          style: 'normal',
          weight: 300,
          sources: [
            { src: '~/assets/fonts/poppins/Poppins-Light.ttf', type: 'truetype' },
          ]
        },
        {
          style: 'normal',
          weight: 400,
          sources: [
            { src: '~/assets/fonts/poppins/Poppins-Regular.ttf', type: 'truetype' },
          ]
        },
        {
          style: 'normal',
          weight: 500,
          sources: [
            { src: '~/assets/fonts/poppins/Poppins-Medium.ttf', type: 'truetype' },
          ]
        },
        {
          style: 'italic',
          weight: 400,
          sources: [
            { src: '~/assets/fonts/poppins/Poppins-Italic.ttf', type: 'truetype' },
          ]
        },
      ]
    },
    {
      family: 'DM Mono',
      locals: ['DM Mono'],
      fallback: ['Poppins', 'sans-serif'],
      variances: [
        {
          style: 'normal',
          weight: 400,
          sources: [
            { src: '~/assets/fonts/dm-mono/DMMono-Medium.ttf', type: 'truetype' },
          ]
        },
      ]
    }],
    lazyOffset: {
      component: '0%',
      asset: '0%'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  render: {
    // compressor: shrinkRay(),
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000,
    },
  }
}
