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
          <!-- <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream> -->
          <qrcode-stream @init="onInit" @decode="onDecode">
            <div class="loading-indicator" v-if="loading">
              Инициализация...
            </div>
          </qrcode-stream>
          <p class="decode-result">Результат: <b>{{ decodedContent }} {{ errorMessage }}</b></p>
        </div>
        <div class="planeta-qr__scaner-information" v-if="scanerInfo==true">
          Дата покупки
          Сумма покупки
        </div>
      </div>

      <div class="planeta-qr__control">
        <button class="btn btn-disable">ВВЕСТИ данные из чека</button>
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
      showScaner: false,
      loading: false,
      scanerInfo: false,
      dates: '',
      summ: ''
    }
  },
  watch: {
    // onDecode(){
    //   this.onDecode;
    // }
  },
  methods: {
    async onInit (promise) {
      this.loading = true
      try {
        await promise
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async onDecode (promise) {
    try {
      const {
        content,      // decoded String or null
        // imageData,    // raw image data of image/frame
        // location      // QR code coordinates or null
      } = await promise

      if (content === null) {
         this.decodedContent = "Пусто";
      } else {
        this.decodedContent = promise;
        this.scanerInfo = true;

        // let rrr = this.decodedContent.toJSON();
        // let value = JSON.parse(rrr);
        // console.log(value);

        let info = [];
        let qrinfo = new Object();
        qrinfo = this.decodedContent
        info.push(qrinfo);
        console.log(info);


        // let arr = new Array();
        // let stroke = JSON.stringify(this.decodedContent);
        // arr.push(stroke);
        // console.log(arr);

        // let dataQR = [{dates: '4', summ: 'Other'}];
        
         

        // let parse_result = info.map(parseDates => {
        //   return parseDates.resultScan.dates;
        // });
        // console.log(parse_result);

      }
    } catch (error) {
        this.decodedContent = "Ошибка";
      }
    },

    // onDecode(content) {
    //   this.decodedContent = content;
    // },

    // onInit(promise) {
    //   promise.then(() => {
    //     console.log('Successfully initilized! Ready for scanning now!');
    //     this.loading = true
    //   })
    //     .catch(error => {
    //     if (error.name === 'NotAllowedError') {
    //       this.errorMessage = 'Hey! I need access to your camera'
    //     } else if (error.name === 'NotFoundError') {
    //       this.errorMessage = 'Do you even have a camera on your device?'
    //     } else if (error.name === 'NotSupportedError') {
    //       this.errorMessage = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
    //     } else if (error.name === 'NotReadableError') {
    //       this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
    //     } else if (error.name === 'OverconstrainedError') {
    //       this.errorMessage = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
    //     } else {
    //       this.errorMessage = 'UNKNOWN ERROR: ' + error.message
    //     }
    //   })
    // },

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