<template>
  <v-btn id="hoverBtn" class="gradient-button" large>
    <slot />
  </v-btn>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class GradientButton extends Vue {
  beforeMount() {
    const e: HTMLElement | null = document.getElementById('hoverBtn')
    if (e != null) {
      e.onmouseenter = (e: any) => {
        console.log('MOUSEOVER')
        const x = e.pageX - e.target.offsetLeft
        const y = e.pageY - e.target.offsetTop

        e.target.style.setProperty('--x', `${x}px`)
        e.target.style.setProperty('--y', `${y}px`)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.gradient-button {
  --x: 50%;
  --y: 50%;

  position: relative;
  appearance: none;
  padding: 1em 2em;
  color: var(--v-basic-base);
  cursor: pointer;
  outline: none;
  border-radius: 100px;

  // The magic
  border: 2px solid transparent;
  background: linear-gradient(var(--v-contast-base), var(--v-contast-base))
      padding-box,
    radial-gradient(farthest-corner at var(--x) var(--y), #5400c9, #ae093a)
      border-box;
}
</style>
