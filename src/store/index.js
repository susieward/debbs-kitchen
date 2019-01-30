import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({

state: {

    menus: [],
    recipes: []
},

    actions: {
         loadMenus: function ({commit}) {
      axios.get('http://localhost:3000/menus').then((response) => {
        commit('setMenus', { menus: response.data})
        })

    },

        loadRecipes: function({commit}) {
            axios.get('http://localhost:3000/recipes').then((response) => {
                commit('setRecipes', {recipes: response.data})
            })
        }


    },

    mutations: {

        setMenus: (state, {menus}) => {
            state.menus = menus
        },

        createMenu: (state, {menu}) =>{
        state.menus.push({menu});
     },

        editMenu: (state, {menu}) =>{
          var id = menu._id;
        let index = state.menus.findIndex(menuItem => menuItem._id === id);
            state.menus.splice(index, 1, menu);
        },


        deleteMenu: (state, id) => {
        let index = state.menus.findIndex(menu => menu._id === id);
            state.menus.splice(index, 1);
        },

        setRecipes: (state, {recipes}) => {
            state.recipes = recipes
        },

        saveRecipe: (state, {recipe}) => {
            state.recipes.push({recipe})
        },

         editRecipe: (state, {recipe}) =>{
           var id = recipe._id;
        let index = state.recipes.findIndex(recipeItem => recipeItem._id === id);
            state.recipes.splice(index, 1, recipe);
        },

          deleteRecipe: (state, id) => {
        let index = state.recipes.findIndex(recipe => recipe._id === id);
            state.recipes.splice(index, 1);
        }

    },

    getters: {

      tags: state => {
          return state.recipes.map(recipe => recipe.tags);

      },

      tagsList: (state, getters) => {

        var t = getters.tags;

        return [].concat(...t);

      },

      uniqueTags: (state, getters) => {

        var list = getters.tagsList;

        var unique = [...new Set(list)];

        return unique;
      },

      sortedTags: (state, getters) => {

        return getters.uniqueTags.sort();
      },


      recipeNames: state => {

        return state.recipes.map(recipe => recipe.name);


      },

      tagsAndRecipes: (state, getters) => {

        var arr1 = getters.recipeNames;
        var arr2 = getters.uniqueTags;

        var arrs = [arr1, arr2];

        return [].concat(...arrs);

      },
         getMenuById: (state, getters) => (id) => {
            return state.menus.find(menu => menu._id == id)
        },

        getRecipeById: (state, getters) => (id) => {
            return state.recipes.find(recipe => recipe._id == id)
        }


    }

})

const filter = (array, key, value) => array.filter(item => item[key] === value);



export default store
