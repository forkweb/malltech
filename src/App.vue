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
        <div class="footer">
          <div class="footer-title">ТРЦ «Планета»</div>

          <div class="footer-contact">
            <p>г. Красноярск, ул. 9 Мая, 77</p>
            <p><a href="tel:+73912771771">+7 (391) 2-771-771</a></p>
          </div>

          <div class="footer-information">
            <a href="">Информация об акции и условиях участия</a>
            <a href="">Политика в отношении обработки персональных данных</a>
          </div>

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
  @import "~@/style/adaptive.css";
</style>
