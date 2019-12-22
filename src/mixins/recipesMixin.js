import { saveRecipe, updateRecipe, deleteRecipe } from '@/services/recipesApi.js'
import { loadRecipes } from '@/services/api.js'

export default {
computed: {
  recipes(){
    return this.$store.state.recipes;
  },
  recipeNames(){
    return this.recipes.map(recipe => recipe.name);
  }
},
methods: {
  async saveRecipe(){
    if(this.newRecipe.name !== '' && this.ingredients !== [] && this.newRecipe.instructions !== [] && this.tags !== [] && this.newRecipe.photo){
      let recipe = {
        name: this.newRecipe.name,
        ingredients: this.ingredients,
        instructions: this.newRecipe.instructions,
        tags: this.tags,
        photo: this.newRecipe.photo,
        hasPhoto: this.newRecipe.hasPhoto
      }
    try {
      let res = await saveRecipe(recipe)
      this.$store.commit('saveRecipe', {recipe: res.data});
      this.$router.push({ name: 'RecipePage', params: { id: data._id }});
      loadRecipes()
    } catch(err) {
        console.log('err', err)
    }
  } else {
    return this.error = "*Please fill out all fields"
  }
  },
  async editRecipe(recipe){
    let data = {
      _id: this.recipe._id,
      name: this.recipeEdit.name,
      ingredients: this.recipeEdit.ingredients,
      instructions: this.recipeEdit.instructions,
      tags: this.recipeEdit.tags,
      photo: this.recipeEdit.photo
    };
    try {
      let res = await updateRecipe(data)
      this.$store.commit('editRecipe', {recipe: res.data});
      this.$emit('close');
    } catch(err) {
        console.log('err')
      }
  },
  async deleteRecipe(_id){
    try {
      let res = await deleteRecipe(_id)
      this.$store.commit('deleteRecipe', {id: res.data});
    } catch(err) {
        console.log('err')
      }
    },
    async loadRecipes(){
      return await loadRecipes()
    }
  }
}
