import {
  VuexModule,
  Module,
  action,
  getter,
  mutation,
} from 'vuex-class-component'
@Module({ namespacedPath: 'modules/theme/', target: 'nuxt' })
export class DrawerModule extends VuexModule {
  @getter getDrawer: boolean = false

  @mutation
  SET_DRAWER(payload: { drawer: boolean }) {
    this.getDrawer = payload.drawer
  }

  @action()
  setDrawer(payload: { drawer: boolean }) {
    this.SET_DRAWER({
      drawer: payload.drawer,
    })
  }
}

export default DrawerModule.ExtractVuexModule(DrawerModule)
