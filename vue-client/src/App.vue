<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <MusicalCalculations :title="title"/>
    <a class="footer" href="https://github.com/hacker-und-koch/musical-calculations">github</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MusicalCalculations from './components/MusicalCalculations.vue';
import NumberInput from './components/NumberInput.vue';

@Component({
  components: {
    MusicalCalculations,
    NumberInput,
  },
})
export default class App extends Vue {
  private title = 'Musical Calculations';
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.footer {
    position: absolute;
    text-align: center;
    bottom: 4px;
}
</style>
