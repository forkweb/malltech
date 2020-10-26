<template>
  <div id="app">
    <div class="site">
      <div class="container container-mobile">
        <div class="nav">
          <div class="nav-logo"><img src="./assets/logo.png" alt=""></div>
          <div class="nav-menu">
            <div class="nav-menu__hamburger">
              <img src="./assets/hamburger.png" alt="">
            </div>	  
          </div>
        </div>
        <div class="content">
          <Planeta/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Planeta from './components/Planeta.vue'

export default {
  name: 'App',
  components: {
    Planeta
  },
  computed() {
    
  }
}
</script>

<style lang="scss" type="text/scss">
  @import "~@/style/main.scss";
</style>
