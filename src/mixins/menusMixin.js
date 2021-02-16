import { Api } from '@/services/api.js'

export default {
computed: {
    menus(){
      return this.$store.state.menus
    },
    recipes(){
      return this.$store.state.recipes;
    },
    recipeNames(){
      return this.recipes.map(recipe => recipe.name);
    },
    createdMenus(){
      let x = this.menus.filter(({date}) => date === this.thisDate);
      return x.filter(({month}) => month === this.month);
    },
    dishResults(){
      let lowSearch = this.newDish.toLowerCase();
      return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(lowSearch));
    }
  },
methods: {
  async createMenu(menu){
    /*
    let menu = {
      date: this.thisDate,
      month: this.month,
      year: this.year,
      dishes: this.dishes
    }
    */
    try {
      let res = await Api.$menus.createMenu(menu)
      this.$store.commit('createMenu', {menu: res.data});
      this.$emit('close');
    } catch(err) {
        console.log('err', err)
    }
  },
  async editMenu(menu){
    let data = {
      _id: this.menu._id,
      date: this.menu.date,
      month: this.menu.month,
      year: this.menu.year,
      dishes: this.menuEdit.dishes
    };
    try {
      let res = await Api.$menus.updateMenu(data)
      this.$store.commit('editMenu', {menu: res.data});
      this.$emit('close');
    } catch(err) {
        console.log('err')
      }
  },
  async deleteMenu(_id){
    try {
      let res = await Api.$menus.deleteMenu(_id)
      this.$store.commit('deleteMenu', {id: res.data});
      this.$emit('close');
    } catch(err) {
        console.log('err')
      }
    },
    async loadMenus(){
      return await Api.$menus.loadMenus()
    }
  }
}
