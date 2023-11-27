<template>
  <div id="app">
    <FormLayout/>
  </div>
</template>

<script>
import FormLayout from './components/FormLayout.vue';

export default {
  name: 'App',
  components: {
    FormLayout,
  }
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
</style>
