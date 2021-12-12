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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-speedkit',
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
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
