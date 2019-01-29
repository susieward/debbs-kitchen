<template>

    <transition name="modal">
        <div class="modal-mask">
     <div class="modal-content">

         <div class="modal-title">
             <h2 class="menu-date">Menu for {{ month + ' ' + thisDate }}</h2>

             <span class="close"><span class="close-button" @click="$emit('close')">&times;</span></span>
         </div>

         <div class="modal-container">
         <div class="modal-items">

             <div v-for="(menu, index) in createdMenus" class="menus" v-if="showEditor == false">

               <div class="menu-list-container">
                 <ul class="menu-list">
                   <li v-for="dish in menu.dishes" @click="linkRecipe(dish)">{{ dish.name }}</li>
                   </ul>
                 </div>

                 <div class="menu-buttons-container"><span><button class="greybtn" @click="openEditor(menu)" v-if="showEditor == false">edit menu</button>
                     <button class="blackbtn" @click="deleteMenu(menu._id)">delete menu</button></span></div>

            </div>




              <menu-editor v-if="showEditor == true" :menu="selectedMenu" @close="closeEditor"></menu-editor>


             <div v-if="newMenuContainer == true">

                  <div v-for="(dish, index) in dishes" class="dishes">
                 <ul class="menu-list">
                 <li><span class="remove" @click="removeDish(index)">x</span> {{ dish.name }}</li>


                 </ul>
            </div>

              <div class="inputs">
             <input type="text" class="dish-item" v-model="newDish" placeholder="Start typing recipe name"/>

             <div v-if="newDish">

                <div class="results-dropdown">


              <ul>
                <li class="dishes-select" v-for="result in dishResults" @click="addToDishes(result)">{{ result.name }}</li>
              </ul>

                </div>
 </div>


             <p v-if="disabled === true" style="color: red">Can't add dish if input is empty</p>
             </div>

             <button class="pinkbtn" v-if="dishes.length" @click="createMenu">save new menu</button>
             </div>

             </div>
             <span>
               <div v-if="createdMenus.length === 0">
                <span>
                <button v-if="newMenuContainer == false" class="pinkbtn" @click="addNewMenu">add new menu</button>
                 <button v-if="newMenuContainer == true" class="greybtn" @click="closeNewMenu">nevermind</button>
                </span>
             </div>
             </span>



         </div>
        </div>



        </div>
    </transition>
</template>
<script>
import MenuEditor from './MenuEditor.vue'
import moment from 'moment'
import axios from 'axios'
export default {
data() {
    return {

        dishes: [],
        newDish: '',
        showEditor: false,
        newMenuContainer: false,
        selectedMenu: undefined,
        search: '',
        results: [],
        isOpen: false,
        inputErr: '',
        disabled: false
        }


},

    name: 'modal',

    components: {
        MenuEditor

    },

    props: ['this-date', 'month'],

    computed: {



        menus(){
            return this.$store.state.menus
        },

        createdMenus(){
            var x = this.menus.filter(({date}) => date === this.thisDate);

            return x.filter(({month}) => month === this.month);
    },

    recipes(){

      return this.$store.state.recipes;
    },

      recipeNames(){

        return this.recipes.map(recipe => recipe.name);


      },



          dishResults: function(){
              var lowSearch = this.newDish.toLowerCase();


              return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(lowSearch)
             );
              }

    },

    methods: {

      linkRecipe: function(dish){

        var dishId = dish._id;

        this.$router.push({ name: 'RecipePage', params: { id: dishId }});

      },

      onChange: function(){

        this.isOpen = true;
        this.filterResults();

      },

      filterResults: function(){
        this.results = this.recipeNames.filter(recipe => recipe.toLowerCase().indexOf(this.search.toLowerCase()) > -1);

      },

      checkInput: function(){
        if(this.newDish === ''){

          this.disabled = true;

        } else {

          this.disabled = false;
          this.addDish();

        }

      },

      addToDishes: function(result){


        this.dishes.push(result);
        this.newDish = '';

      },

        addDish: function(){


            this.dishes.push(this.newDish);
            this.newDish = '';

        },

        removeDish: function(index){
            var dishes = this.dishes;

            dishes.splice(index, 1);
        },

        createMenu: function(){

            axios.post('http://localhost:3000/menus', {
                date: this.thisDate,
                month: this.month,
                dishes: this.dishes

            }).then((response) => {
                this.$store.commit('createMenu', {menu: response.data});
                this.$emit('close');
            });

        },


        deleteMenu: function(_id){


            let path = 'http://localhost:3000/menus/' +_id;

            axios.delete(path).then((response) => {
                this.$store.commit('deleteMenu', {id: response.data});

              });
            this.$emit('close');
            this.$store.dispatch('loadMenus');


            },

        openEditor: function(menu){
            this.selectedMenu = menu;
            this.showEditor = true;
        },

        closeEditor: function(){
            this.showEditor = false;
            this.$store.dispatch('loadMenus');
        },

        addNewMenu: function(){
            this.newMenuContainer = true;
        },

        closeNewMenu: function(){
            if(this.disabled = true){
              this.disabled = false;
            }

            this.newMenuContainer = false;
        }
}



}


</script>
<style>

.dishes-select {
  color: red;
  cursor: pointer;

}

    .menu-editor {
    margin-top: 20px;
    }

    .menus {
        display: grid;

        grid-template-columns: auto auto;

    }

    .menu-list-container {
        display: grid;
        padding-left: 10px;
        justify-content: flex-start;

    }

    .menu-buttons-container {
        display: grid;
        justify-content: flex-end;
    }

    .inputs {
        margin-bottom: 20px;
        margin-top: 20px;
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

    .menu-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    }

    .menu-list li {

    color: #F08080;
    margin: 0;
    padding: 0;
    cursor: pointer;
    }

    .menu-list li:hover {
    color: #000;
    }



    .modal-title {
    display: grid;
    grid-template-columns: auto auto;
    }
    .menu-date {
    font-size: 25px;
    font-weight: 300;
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
    align-items: flex-start;
    }

    .dish-item{
    width: 220px;
    border: 1px solid #777;
    border-radius: 6px;
    padding: 6px 8px;
    font-size: 16px;
    }



    .editbtn {
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


    .modal-buttons {
        display: grid;
        align-items: flex-end;
        border: 1px solid #ddd;
    }

    .results-dropdown {
  width: 300px;
    background-color: #fff;
    min-height: 50px;
    border: 1px solid #000;
    }

</style>
