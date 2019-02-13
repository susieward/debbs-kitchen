<template>
<div class="new-recipe">
  <div class="recipe-form">


       <span><label for="name">Name:</label> <input id="name" type="text" class="recipe-input" v-model="newRecipe.name"/></span>

        <span><label for="ingredients">Ingredients:</label> <input type="text" id="ingredient" class="recipe-input" v-model="newIngredient" placeholder="eggs, flour, pasta, etc"/> <button class="blackbtn" @click="addIngredient">add ingredient</button><span style="color: red">{{ ingrErr }}</span></span>

        <div class="ingredients">
        <ul class="ingr">
            <li v-for="(ingredient, index) in ingredients" :key="index">
                <span class="remove" @click="removeIngr(index)">x</span> <span class="tag">{{ ingredient }}</span></li>
            </ul>
        </div>



    <label for="instructions">Instructions:</label>

    <div class="instructions">

        <div v-for="(box, index) in newRecipe.instructions" class="recipe-text" :key="index">



            <div class="box-item" v-if="editId !== box.id">{{ box.text }} <button class="box-edit" @click="editTrue(box.id)">edit</button><button class="box-remove" @click="remove(index)">X
            </button></div>

            <div class="box-edit-item" v-if="editing === true && editId === box.id">
              <textarea name="instructions" class="recipe-textarea" v-model="editText">{{ box.text }}</textarea><br />
              <span><button @click="editBox(box.id)" class="box-remove">save changes</button> <button class="box-remove" @click="cancel">cancel</button></span>

            </div><br />




        </div>
<div v-if="editing === false">


        <textarea class="recipe-textarea" v-model="newBox.text" placeholder="Add text"></textarea><br /><br />

        <button @click="addBox">add instruction</button>
</div>
    </div>

      <span><label for="tags">Tags:</label> <input type="text" id="tag" class="recipe-input" v-model="newTag" placeholder="dinner, holiday, etc"/> <button class="blackbtn" @click="addTag">add tag</button> <span style="color: red">{{ tagErr }}</span></span>

        <div class="tags-container">
        <ul class="tags-list">
            <li v-for="(tag, index) in tags" :key="index">
                <span class="remove" @click="removeTag(index)">x</span> <span class="tag">{{ tag }}</span></li>
            </ul>
        </div>

      <button class="pinkbtn" @click="saveRecipe">save recipe</button>
<span style="color: red">{{ error }}</span>
    </div>


</div>
</template>
<script>
import draggable from 'vuedraggable'
import axios from 'axios'
export default {
data(){
    return {
        newRecipe: {
            name: '',
            instructions: []
        },
        newBox: {
          text: '',
          id: ''
        },
        editText: '',
        newIngredient: '',
        ingredients: [],
        newTag: '',
        tags: [],
        error: '',
        tagErr: '',
        ingrErr: '',
        newText: {
          text: '',
          order: undefined
        },
        contentArray: [],
        editing: false,
        editId: ''
      }
},

components: {
  draggable
},

methods: {

  onInput: function(value, index){
    this.newText.text = value;
    this.newText.order = index;

    this.contentArray.push(this.newtext);
    this.newText = {}


  },

    addBox: function(){

      var number = Date.now() + Math.random().toString().slice(18);

  var id = 'a' + number;

        this.newBox.id = id;


      this.newRecipe.instructions.push(this.newBox);
      this.newBox = {};


    },

    editTrue: function(id){

      this.editing = true;

      this.editId = id;


    },

    editBox: function(id){



  var boxId = id;

      var index = this.newRecipe.instructions.findIndex(b => b.id === boxId);

      var updatedBox = {
        text: this.editText,
        id: boxId
      }

      this.newRecipe.instructions.splice(index, 1, updatedBox);
      this.editing = false;
      this.editId = ''
      this.editText = ''



    },

    cancel: function(){
      this.editing = false;
      this.editId = '';
      this.editText = '';
    },



    remove: function(index){

      this.newRecipe.instructions.splice(index, 1);

    },

    addIngredient: function(){
      if(this.newIngredient !== ''){
            this.ingredients.push(this.newIngredient);
            this.newIngredient = '';
          } else {
            this.ingrErr = "*Input can't be blank."
          }
        },

        removeIngr: function(index){
            var ingredients = this.ingredients;

            ingredients.splice(index, 1);
        },

    addTag: function(){
      if(this.newTag !== ''){
            this.tags.push(this.newTag);
            this.newTag = '';
          } else {
            this.tagErr = "*Input can't be blank."
          }
        },

        removeTag: function(index){
            var tags = this.tags;

            tags.splice(index, 1);
        },

    saveRecipe: function(){

      if(this.newRecipe.name && this.ingredients && this.newRecipe.instructions && this.tags){

        axios.post('http://localhost:3000/recipes', {
            name: this.newRecipe.name,
            ingredients: this.ingredients,
            instructions: this.newRecipe.instructions,
            tags: this.tags

        }).then((response) => {
            this.$store.commit('saveRecipe', {recipe: response.data});

              this.$router.push('/recipes');
              this.$store.dispatch('loadRecipes');

        });
      } else {
        this.error = "*Please fill out all fields"
      }

    }


},

name: 'NewRecipe'
}
</script>
<style>

.box-item {
display: grid;
grid-template-columns: auto 50px 50px;
grid-template-rows: auto;
background-color: #eee;
padding: 20px;
border: 1px solid transparent;
border-radius: 6px;
}

.box-edit-item {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  background-color: #eee;
  padding: 20px;
  border: 1px solid transparent;
  border-radius: 6px;
}

.box-remove {
background-color: #aaa;
border: 1px solid transparent;
border-radius: 6px;
color: #fff;
padding: 4px 6px;
font-weight: 400;
line-height: normal;
width: auto;
max-height: 30px;
cursor: pointer;

}

.recipe-form {
display: grid;
grid-gap: 20px;
padding: 25px;
align-content: flex-start;
min-height: 500px;
font-family: 'Roboto';
}

.recipe-input{
    width: 200px;
    border: 1px solid #777;
    border-radius: 6px;
    padding: 6px 8px;
    font-size: 16px;
    }




.recipebtn {
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

    label {
      font-weight: 400;
    }

    .ingredients {
    display: grid;

    }

    .ingr {
    list-style-type: none;
    margin: 0;
    padding: 0;

    }

    .ingr li {
  margin-left: 50px;
  font-weight: 400;
    color: #555;
    }

      .tags-container {
    display: grid;

    }

    .tags-list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    }

    .tags-list li {
        display: inline-block;


    }





    .recipe-textarea {
    font-weight: 300;
    font-size: 16px;
    padding: 10px 12px;
    width: 650px;
    min-height: 150px;
    border: 1px solid #777;
    border-radius: 8px;

    }

    .remove {
    font-weight: 400;
    color: #aaa;
    margin-right: 4px;
    cursor: pointer;

    }

    .remove:hover {
    color: #000;
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
</style>
