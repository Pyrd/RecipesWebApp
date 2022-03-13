import config from './configs'
require("dotenv").config();
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

  server: {
    port: process.env.PORT || 3000
  },

  // router: {
  //   middleware: ['auth']
  // },

  plugins: [
    '~/plugins/axios',
    '~/plugins/helpers.ts',
    { src: '~/plugins/vue-unicon.js', mode: 'client' },
    { src: '~/plugins/apexcharts.js', mode: 'client' },
    { src: '~/plugins/draggable.js', },
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
    '@nuxtjs/toast',
    // '@nuxtjs/auth-next',
    '@nuxtjs/axios', '@nuxtjs/i18n',
    'cookie-universal-nuxt',
    "@nuxtjs/gtm",
    "@nuxtjs/firebase",
    '@nuxtjs/pwa',
    "@nuxtjs/recaptcha",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    // "@nuxtjs/google-gtag"
  ],

  axios: {
    proxy: true,
    proxyHeaders: false,
    credentials: true
  },

  env: {
    baseURL: process.env.BACKEND_URL || 'http://localhost:8000/api',
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID
    },
  },

  proxy: {
    '/api': {
      target: process.env.BACKEND_URL || 'http://localhost:8000/api',
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


  // "google-gtag": {
  //   id: "G-1YXGSF3BT8", // required
  //   config: {
  //     send_page_view: true, // might be necessary to avoid duplicated page track on page reload
  //     linker: {
  //       domains: [
  //         "localhost",
  //         "foncierpublic.com",
  //         "dev.foncierpublic.com",
  //         "foncierpublic-frontend-seo.herokuapp.com",
  //         "herokuapp.com"
  //       ]
  //     }
  //   },
  //   debug: false, // enable to track in dev mode
  //   disableAutoPageTrack: false // disable if you don't want to track each page route with router.afterEach(...)
  // },

  gtm: {
    id: "GTM-K26FLNC", // Used as fallback if no runtime config is provided
    enabled: true
  },

  // 'google-gtag': {
  //   id: gaId,
  //   debug: true, // enable to track in dev mode
  //   disableAutoPageTrack: false // disable if you don't want to track each page route with router.afterEach(...).
  // },

  /* Nuxt Firebase */

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  firebase: {
    config: {
      apiKey: "AIzaSyCrA536DKTm_Yjw8TmHWZ0GguVxq5tHkfc",
      authDomain: "recepies-a83e7.firebaseapp.com",
      projectId: "recepies-a83e7",
      storageBucket: "recepies-a83e7.appspot.com",
      messagingSenderId: "571541950703",
      appId: "1:571541950703:web:cb3d33fe96ad9c740f0b1a",
      measurementId: "G-0NNWM9H6S2"
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: "auth/onAuthStateChanged"
        },
        ssr: {
          // credential: true,
          ignorePaths: [
            /^api/
          ]
        }
      },
      analytics: {
        collectionEnabled: true // default
      },
      firestore: false,
      functions: false,
      storage: false,
      database: false,
      messaging: false,
      performance: false,
      remoteConfig: false
    }
  },
  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development',
    }
  },


  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: "6Ld5vB4aAAAAAAFipA3nzSCKgJtpeAt-YxONXYaK", // Site key for requests
    version: 2, // Version
    size: "normal" // Size: 'compact', 'normal', 'invisible' (v2)
  },

  // Nuxt Optimized Images
  optimizedImages: {
    optimizeImages: true
  },

  // Nuxt robots
  robots: {
    UserAgent: "*",
    Disallow: "/admin/*"
  },
  // Nuxt sitemap
  sitemap: {
    hostname: "recepies.io",
    i18n: {
      defaultLocale: "fr",
      locales: ["fr"]
    },
    exclude: ["/admin", "/admin/**"],
    defaults: {
      changefreq: "daily",
      priority: 1,
      lastmod: new Date()
    }
    // routes: async () => {
    //   let sitemap = await axios.get(`${process.env.BACKEND_BASEURL}/sitemap`);
    //   return sitemap.data;
    // }
  },



  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true,
    // html: {
    //   minify: {
    //     collapseBooleanAttributes: true,
    //     decodeEntities: true,
    //     minifyCSS: true,
    //     minifyJS: true,
    //     processConditionalComments: true,
    //     removeEmptyAttributes: true,
    //     removeRedundantAttributes: true,
    //     trimCustomFragments: true,
    //     useShortDoctype: true
    //   }
    // },
    // cache: true,

    // optimization: {
    //   minimize: true,
    //   runtimeChunk: true,
    //   // -concatenateModules: true,
    //   splitChunks: {
    //     chunks: 'all',
    //     minSize: 30000,
    //     maxSize: 0,
    //     minChunks: 1,
    //     maxAsyncRequests: 20,
    //     maxInitialRequests: 3,
    //     automaticNameDelimiter: '~',
    //     name: true,
    //     cacheGroups: {
    //       vendors: {
    //         test: /[\\/]node_modules[\\/]/,
    //         priority: -10
    //       },
    //       default: {
    //         minChunks: 2,
    //         priority: -20,
    //         reuseExistingChunk: true
    //       }
    //     }
    //   }
    // },
    // extractCSS: true,
    // optimizeCSS: true,
  },
  render: {
    // compressor: shrinkRay(),
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000,
    },
  }
}
