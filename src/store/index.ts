export const strict = false

export const actions = {
  async nuxtServerInit({ dispatch }: any, ctx: any) {
    // const {app} = ctx
    // if (this.$fire.auth === null) {
    //   throw 'nuxtServerInit Example not working - this.$fire.auth cannot be accessed.'
    // }

    if (ctx.$fire.auth === null) {
      throw 'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
    }

    if (ctx.app.$fire.auth === null) {
      throw 'nuxtServerInit Example not working - ctx.$fire.auth cannot be accessed.'
    }

    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'

    /** Get the VERIFIED authUser from the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('modules/auth/onAuthStateChanged', {
        authUser,
        claims,
      })
    }
  },
}
