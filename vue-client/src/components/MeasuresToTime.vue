<template>
  <div class="m2t">
    <h2>{{ title }}</h2>
    <NumberInput @change="calcResult" :val="measures" />
    <NumberInput @change="calcResult" :val="bpm" />
    <NumberInput @change="calcResult" :val="signature" />
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
  measuresToTime,
  padTime as pad,
} from '../util';

@Component({
  components: {
    NumberInput,
  },
})
export default class MeasuresToTime extends Vue {
  @Prop() private title!: string;

  public measures!: InputValue<number>;

  public bpm!: InputValue<number>;

  public signature!: InputValue<number>;

  private result = { time: 42, timeStr: 'unset' };

  created() {
    this.measures = (new InputValue<number>())
      .setValue(16)
      .setLabel('measures at');

    this.bpm = (new InputValue<number>())
      .setValue(120)
      .setLabel('BPM with a');

    this.signature = (new InputValue<number>())
      .setValue(4)
      .setLabel('/ 4 signature');

    this.calcResult();
  }

  @Emit()
  private calcResult() {
    const time = measuresToTime({
      measures: this.measures.value,
      bpm: this.bpm.value,
      beatsPerMeasure: this.signature.value,
    });
    const date = new Date(time);
    const timeStr = `${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    this.result.time = time;
    this.result.timeStr = timeStr;
  }
}

</script>

<style scoped lang="less">
</style>
