import axios from 'axios'

export async function createItem(endpoint, item){
  try {
    console.log('creating item')
    return await axios.post(endpoint, item)
  } catch(err){
    console.log('createItem err', err)
    throw err
  }
}
export async function updateItem(endpoint, item){
  try {
    console.log('updating item')
    return await axios.put(endpoint, item)
  } catch(err){
    console.log('updateItem err', err)
    throw err
  }
}
export async function deleteItem(endpoint){
  try {
    return await axios.delete(endpoint)
  } catch(err){
    console.log('deleteItem err', err)
    throw err
  }
}
