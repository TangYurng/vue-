import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  data:{},
  router,
  render: h => h(App),
}).$mount('#app')
