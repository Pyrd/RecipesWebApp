<template>
  <div class="slider-wrapper">
    <span class="mr-3">{{ topline }}</span>
    <div class="slider-content">
      {{ line }}
      <div class="slider">
        <div
          v-for="(item, i) in items"
          :key="i"
          :class="generateClassName(i)"
          class="font-weight-medium gradient-text"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class VerticalTextCarrousel extends Vue {
  @Prop({ default: '' }) readonly topline!: string
  @Prop({ default: '' }) readonly line!: string
  @Prop({ default: [] }) readonly items!: Array<any>

  generateClassName(i: number) {
    let className: string = ''
    if (i == 0) {
      className += 'slider-animate '
    }
    className += `gradient-text-${i}`
    return className
  }
}
</script>
<style lang="scss" scoped>
.gradient-text {
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}

.gradient-text-0 {
  background-image: linear-gradient(45deg, #dace2c, #069dee);
}
.gradient-text-1 {
  background-image: linear-gradient(45deg, #0645ca, #c9043c);
}
.gradient-text-2 {
  background-image: linear-gradient(45deg, #00d85a, #443292);
}

.slider-wrapper {
  font-size: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  align-content: left;
}

.slider-content {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  margin: 1px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.slider {
  height: 50px;
  overflow: hidden;
  padding-left: 11px;
}
.slider div {
  height: 50px;
  margin-bottom: 50px;
  text-align: left;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.slider-animate {
  animation: slide 12s ease-in-out infinite;
}
@keyframes slide {
  0% {
    margin-top: -300px;
  }
  5% {
    margin-top: -200px;
  }
  33% {
    margin-top: -200px;
  }
  38% {
    margin-top: -100px;
  }
  66% {
    margin-top: -100px;
  }
  71% {
    margin-top: 0px;
  }
  100% {
    margin-top: 0px;
  }
}
</style>
