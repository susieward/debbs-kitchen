import { CrudService } from './crud.js'
import { RecipesUrl } from './api.js'

class RecipesApi extends CrudService {
  constructor(){
    super()
  }
  getRecipes(){
    return this.$get(RecipesUrl)
  }
  getRecipe(recipe){
    const id = `${recipe._id}`
    return this.$get(RecipesUrl, id)
  }
  saveRecipe(recipe){
    return this.$create(RecipesUrl, recipe)
  }
  updateRecipe(recipe){
    const id = `${recipe._id}`
    return this.$update(RecipesUrl, recipe, id)
  }
  deleteRecipe(recipe){
    const id = `${recipe._id}`
    return this.$delete(RecipesUrl, id)
  }
}
export default new RecipesApi()
