import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.filter('shoft-hash', val => val.slice(0, 10));
Vue.filter('beautify-msg', val => {
  return val.indexOf('change') >= 0 ? new Date(val.slice(24)).toLocaleString() : new Date(val.slice(22)).toLocaleString();
});

new Vue({
  el: '#app',
  render: h => h(App)
});
