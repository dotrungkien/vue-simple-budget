import Vue from 'vue'
import 'bulma/css/bulma.css'
import localforage from 'localforage'
import { App } from './app'
import router from './router'
import store from './store'

require('localforage-startswith')

localforage.config({
  name: 'vue-simple-budget'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
