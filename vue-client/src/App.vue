<template>
  <!-- <div id="app"> -->
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <MusicalCalculations :title="title"/> -->
    <HelloWorld />
    <a class="footer" target="_blank" href="https://github.com/hacker-und-koch/musical-calculations">github</a>
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import MusicalCalculations from './components/MusicalCalculations.vue';
// import NumberInput from './components/NumberInput.vue';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    // MusicalCalculations,
    HelloWorld,
    // NumberInput,
  },
})
export default class App extends Vue {
  // private title = 'Musical Calculations';
}
</script>

<style>
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
