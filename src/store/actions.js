import { Api } from '@/services/api.js'

const actions = {
  init({ dispatch }) {
    return Promise.all([
      dispatch('setMenus'),
      dispatch('setRecipes'),
      dispatch('setDrafts')
    ])
  },
  async setMenus({ commit }) {
    const menus = await Api.$menus.getMenus()
    commit('setMenus', menus)
  },
  async setRecipes({ commit }) {
    const recipes = await Api.$recipes.getRecipes()
    commit('setRecipes', recipes)
  },
  async setDrafts({ commit }) {
    const drafts = await Api.$drafts.getDrafts()
    commit('setDrafts', drafts)
  }
}
export default actions;
