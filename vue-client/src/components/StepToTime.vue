<template>
  <div class="m2t">
    <h2>{{ title }}</h2>
    <NumberInput @change="calcResult" :val="stepUpper" />
    <NumberInput @change="calcResult" :val="stepLower" />
    <NumberInput @change="calcResult" :val="bpm" />
    <h3>Result: {{ result.timeStr }}</h3>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Emit,
} from 'vue-property-decorator';
import InputValue from '../models/input-value';
import NumberInput from './NumberInput.vue';
import {
  stepToTime,
} from '../util';

@Component({
  components: {
    NumberInput,
  },
})
export default class StepToTime extends Vue {
  @Prop() private title!: string;

  public stepUpper!: InputValue<number>;

  public stepLower!: InputValue<number>;

  public bpm!: InputValue<number>;

  private result = { time: 42, timeStr: 'unset' };

  created() {
    this.stepUpper = (new InputValue<number>())
      .setValue(1)
      .setLabel('');

    this.stepLower = (new InputValue<number>())
      .setValue(16)
      .setLabel('th at');

    this.bpm = (new InputValue<number>())
      .setValue(120)
      .setLabel('BPM');

    this.calcResult();
  }

  @Emit()
  private calcResult() {
    const time = stepToTime({
      step: this.stepUpper.value / this.stepLower.value,
      bpm: this.bpm.value,
    });
    const timeStr = `${time.toFixed(2)} ms`;
    this.result.time = time;
    this.result.timeStr = timeStr;
  }
}

</script>

<style scoped lang="less">
</style>
