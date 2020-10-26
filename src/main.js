import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


// Vue.filter('toCurrency', function (value) {
//   if (typeof value !== "number") {
//       return value;
//   }
//   var formatter = new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0
//   });
//   return formatter.format(value);
// });