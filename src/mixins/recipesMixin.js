import { Api } from '@/services/api.js'

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
  /*
  async saveRecipe(){
    if(this.newRecipe.name !== '' && this.ingredients !== [] && this.newRecipe.instructions !== [] && this.tags !== []){
      let recipe = {
        name: this.newRecipe.name,
        ingredients: this.ingredients,
        instructions: this.newRecipe.instructions,
        tags: this.tags,
        photo: this.newRecipe.photo || "",
        hasPhoto: this.newRecipe.hasPhoto
      }
    try {
      let res = await Api.$recipes.postRecipe(recipe)
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
  */
  async editRecipe(data, id){
    try {
      let res = await  Api.$recipes.putRecipe(data, id)
      this.$store.commit('editRecipe', { recipe: res.data});
      return this.$emit('close');
    } catch(err) {
        console.log('err', err)
      }
  },
  async deleteRecipe(_id){
    try {
      let res = await  Api.$recipes.deleteRecipe(_id)
      this.$store.commit('deleteRecipe', {id: res.data});
    } catch(err) {
        console.log('err')
      }
    },
    async loadRecipes(){
      return await  Api.$recipes.loadRecipes()
    }
  }
}
