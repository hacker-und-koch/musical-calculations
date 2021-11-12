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
export default class TimeToFrequency extends Vue {
  @Prop() private title!: string;

  public time!: InputValue<number>;

  private result = { time: 42, timeStr: 'unset' };

  created() {
    this.time = (new InputValue<number>())
      .setValue(1)
      .setLabel('seconds');

    this.calcResult();
  }

  @Emit()
  private calcResult() {
    const time = Date.now();
    const date = new Date(time);
    const timeStr = `${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    this.result.time = time;
    this.result.timeStr = timeStr;
  }
}

</script>

<style scoped lang="less">
</style>
