import axios from 'axios'
import store from '@/store/index.js'

export class CrudService {
  async $get(endpoint, id = null){
    try {
      let path = endpoint
      if(id){
        path = `${endpoint}/${id}`
      }
      const res = await axios.get(path)
      return res.data
    } catch(err){
      console.log('$get err', err)
      throw err
    }
  }
  async $create(endpoint, item){
    try {
      return await axios.post(endpoint, item)
    } catch(err){
      console.log('createItem err', err)
      throw err
    }
  }
  async $update(endpoint, item, id){
    try {
      return await axios.put(`${endpoint}/${id}`, item)
    } catch(err){
      console.log('updateItem err', err)
      throw err
    }
  }
  async $delete(endpoint, id){
    try {
      return await axios.delete(`${endpoint}/${id}`)
    } catch(err){
      console.log('deleteItem err', err)
      throw err
    }
  }
}
export const CrudApi = new CrudService()
