// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText;
    el.remove()
  }
});

window.eventBus = new Vue();

Vue.filter('currency', function(price, sign, len) {
 price =  Math.abs(price);
 var arr = String(parseInt(price)).split('');
 for (var i = arr.length - 3; i > 0; i -= 3) {
  arr.splice(i, 0, ',')
 }
  var point;
  if((price - parseInt(price)+'').length>(len+2)){
    point= sign + arr.join('') +(price - parseInt(price)+'').substr(1,len+1)
  }else{
    point = sign + arr.join('') + (price - parseInt(price)).toFixed(len).slice(1)
  }
  return point
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
