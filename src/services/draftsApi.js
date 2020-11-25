import { CrudService } from './crud.js'
import { DraftsUrl } from './api.js'

class DraftsApi extends CrudService {
  constructor(){
    super()
  }
  getDrafts(){
    return this.$get(DraftsUrl)
  }
  getDraft(draft){
    const id = `${draft._id}`
    return this.$get(DraftsUrl, id)
  }
  saveDraft(draft){
    return this.$create(DraftsUrl, draft)
  }
  updateDraft(draft){
    const id = `${draft._id}`
    return this.$update(DraftsUrl, draft, id)
  }
  deleteDraft(draft){
    const id = `${draft._id}`
    return this.$delete(DraftsUrl, id)
  }
}
export default new DraftsApi()
