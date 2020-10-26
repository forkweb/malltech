<template>
  <div class="planeta-qr">
    <div class="planeta-qr__title"> {{product}} </div>
    <div class="planeta-qr__text">
      <p>Регистрация чека</p>
    </div>

    <div class="planeta-qr__market">
      <span class="planeta-qr__market-choose">Магазин покупки*</span>
      <v-select :options="options" :reduce="market => market.id" label="market" placeholder="Выбрать магазин"/>
      
      <div class="planeta-qr__scaner">
        <div class="planeta-qr__scaner-click" v-if="showScaner==false">
          <img src="../assets/qr_scan.png" alt="qr_scan" v-on:click="qrscan">
          <p>Нажмите для сканирования QR-кода</p>
        </div>
        <div class="planeta-qr__scaner-qrcode" v-else>
          <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
          <p class="error"> {{ errorMessage }}</p>
          <p class="decode-result">Результат: <b>{{ decodedContent }}</b></p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import vSelect from "vue-select";
import {QrcodeStream} from "vue-qrcode-reader";

export default {
  components: {
    vSelect,
    QrcodeStream
  },
  data() {
    return {
      product: "Авто за 3000 ₽",
      options: [
        {id: '1', market: 'Adidas', selected: false},
        {id: '2', market: 'Nike', selected: false},
        {id: '3', market: 'Reebok', selected: false},
        {id: '4', market: 'Other', selected: false}
      ],
      decodedContent: '',
      errorMessage: '',
      showScaner: false
    }
  },
  watch: {
    // onDecode(){
    //   this.onDecode;
    // }
  },
  methods: {
    onDecode(content) {
      this.decodedContent = content
    },

    onInit(promise) {
      promise.then(() => {
        console.log('Successfully initilized! Ready for scanning now!')
      })
        .catch(error => {
        if (error.name === 'NotAllowedError') {
          this.errorMessage = 'Hey! I need access to your camera'
        } else if (error.name === 'NotFoundError') {
          this.errorMessage = 'Do you even have a camera on your device?'
        } else if (error.name === 'NotSupportedError') {
          this.errorMessage = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
        } else if (error.name === 'NotReadableError') {
          this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.errorMessage = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
        } else {
          this.errorMessage = 'UNKNOWN ERROR: ' + error.message
        }
      })
    },

    qrscan() {
      this.showScaner = true;
    }
  },
  // computed() {
  //   return {
      
  //   }
  // },
  mounted() {
  //  this.onDecode();
  },
}
</script>

<style lang="scss" type="text/scss">
  // @import "~@/style/main.scss";
</style>