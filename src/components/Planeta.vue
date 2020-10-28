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
            <img class="qr_img" src="../assets/qr_scan2.png" alt="qr_scan">
            <div class="loading-indicator" v-if="loading">
              Инициализация...
            </div>
          </qrcode-stream>
          <!-- <p class="decode-result">Результат: <b>{{ decodedContent }} {{ errorMessage }}</b></p> -->
        </div>

      </div>

      <div class="planeta-qr__scaner-information" v-if="scanerInfo==true">

    
          
          <div class="planeta-qr__scaner-information__form">
            <label class="vdp-datepicker-label">Дата покупки*</label>
            <!-- <input class="planeta-input" type="text" :value="dates"> -->
            <datepicker  placeholder="Дата покупки" :value="dates" :format="customFormatter"></datepicker>
            <span class="planeta-input__error">Дата покупки не соответствует условиям акции.</span>
          </div>

          <div class="planeta-qr__scaner-information__form">
            <label>Сумма покупки*</label>
            <input class="planeta-input" type="text" :value="summ">
          </div>

          <div class="planeta-qr__check">
            <file-pond
              name="test"
              ref="pond"
              class-name="my-pond"
              label-idle="Перетащите или выберите фото"
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png"
              max-files="1"
              maxFileSize="5MB"
              v-bind:files="myFiles"
              v-on:init="handleFilePondInit"/>
          </div>

        </div>

      <div class="planeta-qr__control" v-if="showScaner==false">
        <button class="btn btn-disable">ВВЕСТИ данные из чека</button>
      </div>

    </div>

  </div>
</template>

<script>
import vSelect from "vue-select";
import {QrcodeStream} from "vue-qrcode-reader";
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';

import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond/dist/filepond.min.css';


const FilePond = vueFilePond(FilePondPluginFileValidateSize);


export default {
  components: {
    vSelect,
    QrcodeStream,
    Datepicker,
    FilePond
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
      summ: '',
      datepickernew: '',
      myFiles: []
    }
  },
  watch: {
    // datepickernew() {
    //   var state = {
    //     date: new Date(2016, 9,  16)
    //   };
    // },
  },
  methods: {

    handleFilePondInit: function() {
      console.log('FilePond has initialized');
      // FilePond.registerPlugin(FilePondPluginFileValidateSize);
    },

    customFormatter(date) {
      return moment(date).format('DD-MM-yyy');
      // return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    },

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

        let objqr = eval('({obj:[' + this.decodedContent + ']})');
        // this.dates = objqr.obj[0].dates;
        this.summ = objqr.obj[0].summ;


      var st = objqr.obj[0].dates;
      var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      var dt = new Date(st.replace(pattern,'$3-$2-$1'));
      this.dates = dt;

       
      }
    } catch (error) {
        this.decodedContent = "Ошибка";
      }
    },

    qrscan() {
      this.showScaner = true;
    },
  },
  // computed() {
  //   return {
      
  //   }
  // },
  mounted() {
   
  },
}
</script>

<style lang="scss" type="text/scss">
  
</style>