import Vue from 'vue'
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import { uniUserCircle, uniSignout, uniDashboard, uniTachometerFastAlt } from 'vue-unicons/dist/icons'

Unicon.add([uniUserCircle, uniSignout, uniDashboard, uniTachometerFastAlt])
Vue.use(Unicon)