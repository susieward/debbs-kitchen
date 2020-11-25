import { CrudService } from './crud.js'
import { MenusUrl } from './api.js'

class MenusApi extends CrudService {
  constructor(){
    super()
  }
  getMenus(){
    return this.$get(MenusUrl)
  }
  getMenu(menu){
    const id = `${menu._id}`
    return this.$get(MenusUrl, id)
  }
  createMenu(menu){
    return this.$create(MenusUrl, menu)
  }
  updateMenu(menu){
    const id = `${menu._id}`
    return this.$update(MenusUrl, menu, id)
  }
  deleteMenu(menu){
    const id = `${menu._id}`
    return this.$delete(MenusUrl, id)
  }
}
export default new MenusApi()
