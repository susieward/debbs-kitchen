import { createItem, updateItem, deleteItem } from './crud.js'
import { RecipesUrl } from './api.js'

export async function saveRecipe(recipe){
  try {
    return await createItem(RecipesUrl, recipe)
  } catch(err){
    console.log('saveRecipe err', err)
    throw err
  }
}
export async function updateRecipe(recipe){
  try {
    let path = `${RecipesUrl}/${recipe._id}`
    console.log('updating recipe')
    return await updateItem(path, recipe)
  } catch(err){
    console.log('updateRecipe err', err)
    throw err
  }
}
export async function deleteRecipe(_id){
  try {
    let path = `${RecipesUrl}/${_id}`
    return await deleteItem(path)
  } catch(err){
    console.log('deleteRecipe err', err)
    throw err
  }
}
