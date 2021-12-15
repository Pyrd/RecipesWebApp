import colors from 'vuetify/es5/util/colors'
import shrinkRay from 'shrink-ray-current'
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
  ],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-speedkit',
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  axios: {
    proxy: true,
    proxyHeaders: false
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8000/api',
      pathRewrite: { '^/api': '/' }
    }
  },

  router: {
    middleware: ['auth']
  },

  auth: {
    // redirect: {
    //   login: "/login",
    //   logout: "/login",
    //   callback: "/login",
    //   home: false,
    // },
    strategies: {
      local: false,
      cookie: {
        token: {
          property: "data.access_token",
          required: true,
          type: "Bearer",
        },
        user: {
          property: "data",
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
      localRefresh: {
        scheme: 'refresh',
        token: {
          property: 'token.access_token',
          maxAge: 15
        },
        refreshToken: {
          property: 'token.refresh_token',
          data: 'refresh_token',
          maxAge: false
        }
      },
    },
  },

  // auth: {
  //   localStorage: false,
  //   redirect: {
  //     callback: '/callback',
  //     logout: '/signout'
  //   },
  //   strategies: {
  //     localRefresh: {
  //       scheme: 'refresh',
  //       token: {
  //         property: 'access_token',
  //         maxAge: 1800,
  //         global: true,
  //       },
  //       refreshToken: {
  //         property: 'refresh_token',
  //         data: 'refresh_token',
  //         maxAge: false
  //       }
  //     },
  //     local: {
  //       scheme: 'refresh',
  //       cookie: {
  //         // (optional) If set, we check this cookie existence for loggedIn check
  //         name: 'access_token',
  //       },
  //       token: {
  //         property: 'access_token',
  //         type: 'Bearer',
  //         required: true,
  //         maxAge: 1800,
  //         global: true,
  //       },
  //       refreshToken: {
  //         property: 'refresh_token',
  //         data: 'refresh_token',
  //         maxAge: 60 * 60 * 24 * 30,
  //       },
  //       user: {
  //         property: false,
  //         autoFetch: true
  //       },
  //       endpoints: {
  //         login: { url: 'api/auth/login', method: 'post', propertyName: false },
  //         refresh: { url: 'api/auth/refresh', method: 'get' },
  //         user: { url: 'api/user/me', method: 'get', propertyName: false },
  //         logout: { url: 'api/auth/logout', method: 'post' }
  //       },
  //       autoLogout: true,
  //       tokenRequired: false,
  //       tokenType: false
  //     },
  //     cookie: {
  //       user: {
  //         property: false,
  //         autoFetch: false,
  //       },
  //       endpoints: {
  //         login: { url: '/api/auth/login', method: 'post' },
  //       }
  //     }
  //   }
  // },


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
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#F50057"
        }
      }
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
