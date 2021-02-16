import { CrudService } from './crud.js'
import { RecipesUrl } from './api.js'

class RecipesApi extends CrudService {
  constructor(){
    super()
  }
  getRecipes(){
    return this.$get(RecipesUrl)
  }
  getRecipeById(id){
  //  const id = `${recipe._id}`
    return this.$get(RecipesUrl, id)
  }
  postRecipe(recipe){
    return this.$create(RecipesUrl, recipe)
  }
  putRecipe(recipe, id){
    //const id = `${recipe._id}`
    return this.$update(RecipesUrl, recipe, id)
  }
  deleteRecipe(id){
    //const id = `${recipe._id}`
    return this.$delete(RecipesUrl, id)
  }
}
export default new RecipesApi()
