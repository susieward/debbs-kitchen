<template>
      <div class="recipe-editor">

    <div class="recipe-form">
       <span><label for="name">Name:</label> <input  type="text" class="recipe-input" v-model="recipeEdit.name" :placeholder="recipe.name"/></span>

        <span><label for="ingredients">Ingredients:</label> <input type="text" class="recipe-input" v-model="newIngredient" placeholder="e.g. eggs, flour, etc"/> <button class="blackbtn" @click="addIngredient">add ingredient</button></span>

        <div class="ingredients">
        <ul class="ingr">
            <li v-for="(ingredient, index) in recipeEdit.ingredients">
                <span class="remove" @click="removeIngr(index)">x</span> {{ ingredient }}</li>
            </ul>
        </div>

        <label for="instructions">Instructions:</label>
        <textarea v-model="recipeEdit.instructions" name="instructions" class="recipe-textarea" :placeholder="recipe.instructions"></textarea>

      <span><label for="tags">Tags:</label> <input type="text" id="tag" class="recipe-input" v-model="newTag" placeholder="e.g. dinner, holiday, etc"/> <button class="blackbtn" @click="addTag">add tag</button></span>

        <div class="tags-container">
        <ul class="tags-list">
            <li v-for="(tag, index) in recipeEdit.tags">
                <span class="remove" @click="removeTag(index)">x</span> <span class="tag">{{ tag }}</span></li>
            </ul>
        </div>

      <button class="pinkbtn" @click="editRecipe(recipe)">save changes</button>

    </div>

    </div>
</template>
<script>
import axios from 'axios'
export default {
data(){
    return {
        recipeEdit: {
            name: '',
            instructions: '',
           ingredients: [],
            tags: []
        },
        newIngredient: '',
        newTag: ''
    }
},

    props: ['recipe'],
    name: 'RecipeEditor',

    created(){
    this.recipeEdit = Object.assign({}, this.recipe);
},

    methods: {
         addIngredient: function(){

            this.recipeEdit.ingredients.push(this.newIngredient);
            this.newIngredient = '';
        },

        removeIngr: function(index){
            var ingredients = this.recipeEdit.ingredients;

            ingredients.splice(index, 1);
        },

    addTag: function(){

            this.recipeEdit.tags.push(this.newTag);
            this.newTag = '';
        },

    removeTag: function(index){
            var tags = this.recipeEdit.tags;

            tags.splice(index, 1);
        },


    editRecipe: function(recipe){

        let path = 'http://localhost:3000/recipes/' +recipe._id;

        let data = {
            _id: this.recipe._id,
            name: this.recipeEdit.name,
            ingredients: this.recipeEdit.ingredients,
            instructions: this.recipeEdit.instructions,
            tags: this.recipeEdit.tags

            };

        axios.put(path, data).then((response) => {
            this.$store.commit('editRecipe', {recipe: response.data});

        });
        this.$emit('close');

        }
    }
}

</script>
<style>

    .recipe-form {
display: grid;
grid-gap: 20px;
padding: 25px;
align-content: flex-start;
min-height: 500px;
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
    font-size: 16px;
    padding: 10px 12px;
    width: 650px;
    min-height: 150px;
    border: 1px solid #777;
    border-radius: 8px;
    resize: none;

    }








</style>
