import { createItem, updateItem, deleteItem } from './crud.js'
import { DraftsUrl } from './api.js'

export async function saveDraft(draft){
  try {
    console.log('saving draft')
    return await createItem(DraftsUrl, menu)
  } catch(err){
    console.log('saveDraft err', err)
    throw err
  }
}
export async function updateDraft(draft){
  try {
    console.log('updating draft')
    return await createItem(DraftsUrl, draft)
  } catch(err){
    console.log('updateDraft err', err)
    throw err
  }
}
export async function deleteDraft(_id){
  try {
    let path = `${DraftsUrl}/${_id}`
    return await deleteItem(path)
  } catch(err){
    console.log('deleteDraft err', err)
    throw err
  }
}
