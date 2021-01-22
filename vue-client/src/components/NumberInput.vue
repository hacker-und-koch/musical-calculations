<template>
  <div class="number-input" @click="selectValue">
    <input type="number" v-model.number="val.value" @change="signalChange" @keyup="signalChange" />
    {{ val.label }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import InputValue from '../models/input-value';

@Component
export default class NumberInput extends Vue {
  @Prop() private val!: InputValue<number>;

  public selectValue(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target instanceof HTMLInputElement) {
      event.target.select();
    } else {
      const leElem = (event.target as HTMLElement).getElementsByTagName('input')[0];
      if (leElem) {
        leElem.select();
      }
    }
    this.val.pristine = false;
  }

  public signalChange(origEvent: Event) {
    this.$emit('change', origEvent);
  }
}
</script>

<style scoped lang="less">
.number-input {
  text-align: left;
}
input {
  border: none;
  background: inherit;
  color: inherit;
  font: inherit;
  text-align: right;
  text-decoration: underline;
}
</style>
