import store from '@/store/index.js'
import axios from 'axios'

const ProdUrl = 'https://debbskitchen-server.herokuapp.com'
const DevUrl = 'http://localhost:3000'
export const ApiUrl = process.env.NODE_ENV === 'production' ? ProdUrl : DevUrl
export const MenusUrl = `${ApiUrl}/menus`
export const RecipesUrl = `${ApiUrl}/recipes`
export const DraftsUrl = `${ApiUrl}/drafts`

export async function loadAll(){
  try {
    return await Promise.all([loadMenus(), loadRecipes(), loadDrafts()])
  } catch(err){
    console.log('loadAll err', err)
    throw err
  }
}
export async function loadMenus(){
  try {
    console.log('loading menus')
    let res = await axios.get(MenusUrl)
    return store.dispatch('setMenus', res.data)
  } catch(err){
    console.log('loadMenus err', err)
    throw err
  }
}

export async function getMenus(){
  try {
    console.log('getting menus')
    return await axios.get(MenusUrl)
  } catch(err){
    console.log('getMenus err', err)
    throw err
  }
}

export async function loadRecipes(){
  try {
    console.log('loading recipes')
    let res = await axios.get(RecipesUrl)
    return store.dispatch('setRecipes', res.data)
  } catch(err){
    console.log('loadRecipes err', err)
    throw err
  }
}

export async function loadDrafts(){
  try {
    console.log('loading drafts')
    let res = await axios.get(DraftsUrl)
    return store.dispatch('setDrafts', res.data)
  } catch(err){
    console.log('loadDrafts err', err)
    throw err
  }
}
