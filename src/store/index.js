import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

Vue.use(Vuex)

const state = {
  menus: [],
  recipes: [],
  boxes: [],
  drafts: [],
  token: localStorage.getItem('user-token') || '',
  status: ''
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

//const filter = (array, key, value) => array.filter(item => item[key] === value);
