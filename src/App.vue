<template>
  <div id="app">
    <Planeta></Planeta>
  </div>
</template>

<script>
import Planeta from './components/Planeta.vue'

export default {
  name: 'App',
  components: {
    Planeta
  }
}
</script>

<style lang="scss" type="text/scss">
  @import "~@/style/main.scss";
</style>
