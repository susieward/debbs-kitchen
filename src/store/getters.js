const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  tags: state => {
    return state.recipes.map(recipe => recipe.tags);
  },

  tagsList: (state, getters) => {
    var t = getters.tags;
    return [].concat(...t);
  },

  uniqueTags: (state, getters) => {
    let list = getters.tagsList;
    let unique = [...new Set(list)];
    return unique;
  },

  sortedTags: (state, getters) => {
    return getters.uniqueTags.sort();
  },

  recipeNames: state => {
    return state.recipes.map(recipe => recipe.name);
  },

  recipeNameWords: (state, getters) => {
    let names = getters.recipeNames;
    let newArr = [];
    names.forEach((name) => {
      newArr.push.apply(newArr, name.split(" "));
    })
    return newArr;
  },

  uniqueWords: (state, getters) => {
    var words = getters.recipeNameWords;
    var unique = [...new Set(words)];
    return unique;
  },

  tagsAndRecipes: (state, getters) => {
    let arr1 = getters.recipeNames;
    let arr2 = getters.uniqueTags;
    let arrs = [...arr1, ...arr2];
    return arrs
  },

  getMenuById: (state, getters) => (id) => {
    return state.menus.find(menu => menu._id == id)
  },

  getRecipeById: (state, getters) => (id) => {
    return state.recipes.find(recipe => recipe._id == id)
  },
  drafts(state){
    return state.drafts
  }
}

export default getters;
