import store from '@/store/index.js'
import axios from 'axios'
import Menus from './menusApi.js'
import Recipes from './recipesApi.js'
import Drafts from './draftsApi.js'

const ProdUrl = 'https://debbskitchen-server.herokuapp.com'
const DevUrl = 'http://localhost:3000'
//export const ApiUrl = process.env.NODE_ENV === 'production' ? ProdUrl : DevUrl
export const ApiUrl = ProdUrl;
export const MenusUrl = `${ApiUrl}/menus`
export const RecipesUrl = `${ApiUrl}/recipes`
export const DraftsUrl = `${ApiUrl}/drafts`

export class Api {
  static $menus = Menus;
  static $recipes = Recipes;
  static $drafts = Drafts
  static async init(){
    await store.dispatch('init')
  }
}
