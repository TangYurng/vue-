import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import iView from 'iview';
import 'iview/dist/styles/iview.css';   
import './assets/icon/iconfont.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(iView);

new Vue({
  data:{},
  router,
  render: h => h(App),
}).$mount('#app')
