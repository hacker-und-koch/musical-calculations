<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <MeasuresToTime title="Measures To Time" />
    <StepToTime title="Step To Time" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MeasuresToTime from './MeasuresToTime.vue';
import StepToTime from './StepToTime.vue';

@Component({
  components: {
    MeasuresToTime,
    StepToTime,
  },
})
export default class MusicalCalculations extends Vue {
  @Prop()
  private title!: string;
}
</script>

<style scoped lang="less">
</style>
