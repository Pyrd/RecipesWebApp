require('dotenv').config()

module.exports = {
  srcDir: 'src/',

  buildDir: 'dist/',
  server: {
    port: process.env.PORT || 8080,
  },
  srr: true,
  components: true,
  /*
   ** Headers of the page
   */
  head: {
    title: 'Template',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Template',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    middleware: ['theme', 'user-agent'],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/core/Loading.vue',
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/helpers.ts',
    { src: '~/plugins/errorhandler.ts', mode: 'client' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    // 'nuxt-purgecss',
    // ['@nuxtjs/google-analytics', {
    //   id: 'UA-154843930-1'
    // }],
    // ['nuxt-stripe-module', {
    //   version: 'v3',
    //   //TODO: change publishableKey based on environment
    //   publishableKey: 'pk_test_EiveKNyPoW3C9bpmpEJXuawF'
    // }],
  ],

  env: {
    BACKEND_BASEURL: process.env.BACKEND_BASEURL,
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/firebase',
    '@nuxtjs/svg',
    '@nuxtjs/toast',
    'nuxt-i18n',
    '@nuxtjs/sitemap',
    ['cookie-universal-nuxt', { sameSite: 'lax' }],
    '@nuxtjs/recaptcha',
    'nuxt-webfontloader',
    // '@nuxtjs/robots',
    // '@nuxtjs/auth',
    // '@nuxtjs/style-resources',
  ],

  // ------------MODULES------------
  /* Nuxt Firebase */
  firebase: {
    config: {
      apiKey: 'AIzaSyBSgnjvaMFpkwQIpKgysXLAe1qstSdmN2A',
      authDomain: 'timeline-app-mc1.firebaseapp.com',
      projectId: 'timeline-app-mc1',
      storageBucket: 'timeline-app-mc1.appspot.com',
      messagingSenderId: '779186909011',
      appId: '1:779186909011:web:5966b1a68a96587620fba6',
      measurementId: 'G-5T9LQDN16X',
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'modules/auth/onAuthStateChanged',
        },
        ssr: true,
      },
    },
  },
  /* PWA */
  pwa: {
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development',
    },
  },
  /* Nuxt webfontloader */
  webfontloader: {
    google: {
      families: ['Poppins:300,400, 600,700, 800'],
      urls: [
        'https://fonts.googleapis.com/css?family=Poppins:300,400,600,700,800&display=swap',
      ],
    },
  },
  /* Nuxt reCAPTCHA */
  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: '6Ld5vB4aAAAAAAFipA3nzSCKgJtpeAt-YxONXYaK', // Site key for requests
    version: 2, // Version
    size: 'normal', // Size: 'compact', 'normal', 'invisible' (v2)
  },

  // Nuxt i18n
  i18n: {
    strategy: 'prefix',
    seo: true,
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    redirectCookieKey: 'redirected',
    useRedirectCookie: true,
    store: true,
    lazy: true,
    langDir: 'assets/lang/',
    locales: [
      {
        code: 'en',
        file: 'en.json',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'fr',
        file: 'fr.json',
        iso: 'fr-FR',
        name: 'Français',
      },
    ],
    // routes: {
    //   'sections/_id': {
    //     fr: '/sections/:id?',
    //     es: '/sections/:id?',
    //   },
    // },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    },
  },

  // Nuxt Toastify
  toast: {
    position: 'top-right',
    register: [],
    iconPack: 'mdi',
  },

  // Nuxt Optimized Images
  optimizedImages: {
    optimizeImages: true,
  },

  // Nuxt Vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    optionsPath: '~/vuetify.options.ts',
    defaultAssets: false,
    icons: false,
  },

  icons: {
    iconfont: 'mdiSvg',
  },

  // Nuxt Style Ressources
  // styleResources: {
  //   scss: ['~/assets/*.scss'],
  // },

  // Nuxt Purge CSS
  // purgeCSS: {
  //   content: [
  //     `./public/**/*.html`,
  //     `./client/**/*.vue`,
  //     `./node_modules/vuetify/src/**/*.ts`,
  //     `./node_modules/vuetify/dist/vuetify.css`,
  //     `./node_modules/vue-slick-carousel/**/*.css`
  //   ],
  //   safelist: [
  //     /-(leave|enter|appear)(|-(to|from|active))$/,
  //     /^(?!(|.*?:)cursor-move).+-move$/,
  //     /^router-link(|-exact)-active$/,
  //     /data-v-.*/,
  //   ],
  // },

  // // Nuxt robots
  robots: {
    Sitemap: '',
  },
  // Nuxt sitemap
  sitemap: {
    sitemap: {
      hostname: 'https://mathieucailly.com',
      i18n: {
        defaultLocale: 'en',
        locales: ['en', 'fr'],
      },
    },
  },

  // Nuxt Authentification
  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: '/sessions', method: 'post', propertyName: 'token' },
  //         logout: false,
  //         user: {
  //           url: '/sessions/user',
  //           method: 'get',
  //           propertyName: 'data.attributes',
  //         },
  //       },
  //       // tokenRequired: true,
  //       tokenType: '',
  //     },
  //   },
  //   redirect: {
  //     home: false,
  //     callback: false,
  //     logout: false,
  //   },
  // },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
