import { getMenus } from '@/services/api.js'

const actions = {
  setMenus({commit}, menus) {
    commit('setMenus', menus)
  },
  setRecipes({commit}, recipes) {
    commit('setRecipes', recipes)
  },
  setDrafts({commit}, drafts) {
    commit('setDrafts', drafts)
  },
  async getMenus(){
    try {
      return await getMenus()
    } catch(err){
      console.log('get menus store err', err)
      throw err
    }
  }
}
export default actions;
