import axios from 'axios'

const mutations = {

// login
  AUTH_REQUEST: (state) => {
    state.status = 'loading'
  },
  AUTH_SUCCESS: (state, {token}) => {
    localStorage.setItem('user-token', token)
    axios.defaults.headers.common['Authorization'] = token
    state.status = 'success'
    state.token = token
  },
  AUTH_ERROR: (state) => {
    localStorage.removeItem('user-token')
    state.status = 'error'
  },
  AUTH_LOGOUT: (state) => {
    localStorage.removeItem('user-token')
    delete axios.defaults.headers.common['Authorization']
    state.token = ''
  },

// menus
  setMenus: (state, menus) => {
    state.menus = menus
    console.log('menus set')
  },
  createMenu: (state, {menu}) =>{
    state.menus.push({menu});
    console.log(state.menus)
  },
  editMenu: (state, {menu}) =>{
    let id = menu._id;
    let index = state.menus.findIndex(menuItem => menuItem._id === id);
    state.menus.splice(index, 1, menu);
  },

  deleteMenu: (state, id) => {
    let index = state.menus.findIndex(menu => menu._id === id);
    state.menus.splice(index, 1);
  },

// recipes
  setRecipes: (state, recipes) => {
    state.recipes = recipes
    console.log('recipes set')
  },

  saveRecipe: (state, {recipe}) => {
    state.recipes.push({recipe})
  },

  editRecipe: (state, {recipe}) =>{
    let id = recipe._id;
    let index = state.recipes.findIndex(recipeItem => recipeItem._id === id);
    state.recipes.splice(index, 1, recipe);
  },

  deleteRecipe: (state, id) => {
    let index = state.recipes.findIndex(recipe => recipe._id === id);
    state.recipes.splice(index, 1);
  },

// drafts
  setDrafts: (state, drafts) => {
    state.drafts = drafts
    console.log('drafts set')
  },

  saveDraft: (state, {draft}) =>{
    state.drafts.push({draft});
  },

  editDraft: (state, {draft}) =>{
    let id = draft._id;
    let index = state.drafts.findIndex(draftItem => draftItem._id === id);
    state.drafts.splice(index, 1, draft);
  },

  deleteDraft: (state, id) => {
    let index = state.drafts.findIndex(draft => draft._id === id);
    state.drafts.splice(index, 1);
  }
}

export default mutations;
