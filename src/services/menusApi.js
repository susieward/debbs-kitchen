import { createItem, updateItem, deleteItem } from './crud.js'
import { MenusUrl } from './api.js'

export async function createMenu(menu){
  try {
    console.log('creating menu')
    return await createItem(MenusUrl, menu)
  } catch(err){
    console.log('createMenu err', err)
    throw err
  }
}
export async function updateMenu(menu){
  try {
    let path = `${MenusUrl}/${menu._id}`
    console.log('updating menu')
    return await updateItem(path, menu)
  } catch(err){
    console.log('createMenu err', err)
    throw err
  }
}
export async function deleteMenu(_id){
  try {
    let path = `${MenusUrl}/${_id}`
    return await deleteItem(path)
  } catch(err){
    console.log('deleteMenu err', err)
    throw err
  }
}
