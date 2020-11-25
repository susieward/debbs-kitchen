<template>
<div class="menu-editor">
  <div class="editor-list-container">
    <ul class="menu-list-edit">
      <li v-for="(dish, index) in menuEdit.dishes"><span class="remove" @click="removeDish(index)">x</span> {{ dish.name }}</li>
    </ul>
    <div class="inputs">
      <input type="text" class="dish-item" v-model="newDish" placeholder="Start typing recipe name"/>
      <div v-if="newDish">
        <div class="results-dropdown" v-if="dishResults.length">
          <ul class="dishes-select">
            <li v-for="result in dishResults" @click="addToDishes(result)">{{ result.name }}</li>
          </ul>
        </div>
      </div>
      <p v-if="disabled === true" style="color: red">Can't add dish if input is empty</p>
    </div>
  </div>
  <div class="editor-buttons-container">
    <span>
      <button class="pinkbtn" @click="editMenu(menu)">save changes</button>
      <button class="greybtn" @click="$emit('close')">close editor</button>
    </span>
 </div>
</div>
</template>
<script>
import { Api } from '@/services/api.js'
import axios from 'axios'
export default {
data(){
  return {
    menuEdit: {
      dishes: []
    },
    newDish: '',
    disabled: false
  }
},
props: ['menu'],
name: 'MenuEditor',
created(){
    this.menuEdit = Object.assign({}, this.menu);
},
computed: {
  recipes(){
    return this.$store.state.recipes;
  },
  recipeNames(){
    return this.recipes.map(recipe => recipe.name);
  },
  dishResults(){
    let lowSearch = this.newDish.toLowerCase();
    return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(lowSearch));
  }
},
methods: {
  checkInput(){
    if(this.newDish === ''){
      this.disabled = true;
    } else {
      this.disabled = false;
      this.addDish();
    }
  },
  addToDishes(result){
    this.menuEdit.dishes.push(result);
    this.newDish = '';
  },
  addDish(){
    this.menuEdit.dishes.push(this.newDish);
    this.newDish = '';
  },
  removeDish(index){
    let dishes = this.menuEdit.dishes;
    dishes.splice(index, 1);
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

/*
  editMenu(menu){
      let path = 'https://debbskitchen-server.herokuapp.com/menus/' + menu._id;
      let data = {
        _id: this.menu._id,
        date: this.menu.date,
        month: this.menu.month,
        year: this.menu.year,
        dishes: this.menuEdit.dishes
      };
      axios.put(path, data).then((response) => {
          this.$store.commit('editMenu', {menu: response.data});
          this.$store.dispatch('loadMenus');
        });
      this.$emit('close');
    }

    */
  }
}
</script>
<style>
    .menu-editor {
        display: grid;
        grid-template-columns: auto auto;

    margin: 0;
    padding: 0;
    }

    .menus {
        display: grid;
        grid-gap: 0;

    }

    .inputs {
     margin-top: 20px;
    }

     .editor-list-container {
        display: grid;
        padding-left: 10px;
        justify-content: flex-start;

    }

    .editor-buttons-container {
        display: grid;
        justify-content: flex-end;
    }

    .close {
    display: grid;
    justify-content: flex-end;

    }

    .close-button{
    font-size: 40px;
    cursor: pointer;
    }

    .close-button:hover {
    color: #eee;
    }

    .dishes {
    display: grid;
    grid-gap: 0;
    }

    .menu-list-edit {
    list-style-type: none;
    margin: 0;
    padding: 0;
    }

    .menu-list-edit li {
    margin: 0;
    padding: 0;
    color: #000;
    cursor: normal;
    }

    .remove {
        font-family: 'Proxima Nova Regular';
        color: #e50000;
        font-size: 18px;
        margin-right: 5px;
        padding: 2px;
        cursor: pointer;
    }

    .modal-title {
    display: grid;
    grid-template-columns: auto auto;
    }
    .menu-date {
    font-size: 25px;
    }

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
display: grid;
    justify-content: center;
align-items: center;
  background-color: rgba(0, 0, 0, .5);
transition: opacity .3s ease;
}

.modal-content {
display: grid;
position: relative;
align-content: flex-start;
background-color: #fefefe;
padding: 20px;
width: 830px;
min-width: auto;
min-height: 400px;
overflow: scroll;
max-height: 550px;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
}
    .modal-container {
    display: grid;
    grid-gap: 20px;
    padding: 0px;
    }

    .modal-items {
    display: grid;
    background-color: #f9f9f9;
    padding: 20px;
    grid-gap: 0;
    min-height: 250px;
    align-content: flex-start;
    }

    .dish-item{
    width: 220px;
    border: 1px solid #777;
    border-radius: 6px;
    padding: 6px 8px;
    font-size: 16px;
    }


    .imgupload-edit {

    padding: 10px;

    }

    .imgedit {


    }


    .greybtn {
     border: none;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #ddd;
    padding: 6px 10px;
    font-size: 16px;
    color: #444;
    cursor: pointer;
   max-width: 150px;
    }

    .pinkbtn {
     border: none;
    border: 1px solid #F08080;
    border-radius: 6px;
    background-color: #F08080;
    padding: 6px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
   max-width: 150px;
    }

    .blackbtn {
       border: none;
    border: 1px solid #000;
    border-radius: 6px;
    background-color: #000;
    padding: 6px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
   max-width: 150px;
    }

     .closebtn {
       border: none;
    border: 1px solid #000;
    border-radius: 6px;
    background-color: #000;
    padding: 6px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
   max-width: 150px;
    }

    .generalbtn {
    border: none;
    border: 1px solid #F56C7C;
    border-radius: 6px;
    background-color: #F56C7C;
    padding: 6px 10px;
    font-size: 16px;
    color: #fff;
    font-family: 'Work Sans';
    font-weight: 400;
    cursor: pointer;

    }

     .generalbtn:hover {
background-color: rgba(245, 108, 124, 0.6);
border: 1px solid rgba(245, 108, 124, 0.6);
}

    .btns {
    display: grid;
    justify-content: center;
    grid-template-columns: auto auto;
    grid-gap: 10px;
        margin: auto;
        padding: 20px;
        border: 1px solid #eee;
    }

    .material-icons {
        cursor: pointer;
    }

    .results-dropdown {
  width: 300px;
    background-color: #ddd;
    min-height: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    .dishes-select {
      list-style-type: none;
margin: 0;
padding: 0;
    }

    .dishes-select li {
    display: block;
    background-color: #ddd;
    color: #444;
    cursor: pointer;
    letter-spacing: normal;
    padding: 4px 6px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    }

    .dishes-select li:hover {
      background-color: #aaa;
      color: #fff;
      border-left: 1px solid #aaa;
      border-right: 1px solid #aaa;
    }


    @media screen and (max-width: 590px){
      .results-dropdown {
    width: 200px;

      }
    }
</style>
