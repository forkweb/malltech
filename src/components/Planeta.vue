<template>
  <div class="planeta-qr">
    <div class="planeta-qr__title"> {{product}} </div>
    <div class="planeta-qr__text">
      <p>Регистрация чека</p>
    </div>

    <div class="planeta-qr__market">
      <span class="planeta-qr__market-choose">Магазин покупки*</span>
      <v-select :options="options" :reduce="market => market.id" label="market" v-model="selected" placeholder="Выбрать магазин"/>
      
      <div class="planeta-qr__market-scaner">
        
      </div>

    </div>

  </div>
</template>

<script>
import vSelect from "vue-select";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      product: "Авто за 3000 ₽",
      options: [
        {id: '1', market: 'Adidas', selected: false},
        {id: '2', market: 'Nike', selected: false},
        {id: '3', market: 'Reebok', selected: false},
        {id: '4', market: 'Other', selected: false}
      ]
    }
  },
  computed: {
    
  }
}
</script>

<style lang="scss" type="text/scss">
  // @import "~@/style/main.scss";
</style>