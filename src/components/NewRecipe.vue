<template>
<div class="new-recipe">
  <div class="recipe-form">


       <span><label for="name">Name:</label> <input id="name" type="text" class="recipe-input" v-model="newRecipe.name"/></span>

        <span><label for="ingredients">Ingredients:</label> <input type="text" id="ingredient" class="recipe-input" v-model="newIngredient" placeholder="eggs, flour, pasta, etc"/> <button class="blackbtn" @click="addIngredient">add ingredient</button><span style="color: red">{{ ingrErr }}</span></span>

        <div class="ingredients">
        <ul class="ingr">
            <li v-for="(ingredient, index) in ingredients">
                <span class="remove" @click="removeIngr(index)">x</span> <span class="tag">{{ ingredient }}</span></li>
            </ul>
        </div>

        <label for="instructions">Instructions:</label>
        <textarea v-model="newRecipe.instructions" name="instructions" class="recipe-textarea"></textarea>

      <span><label for="tags">Tags:</label> <input type="text" id="tag" class="recipe-input" v-model="newTag" placeholder="dinner, holiday, etc"/> <button class="blackbtn" @click="addTag">add tag</button> <span style="color: red">{{ tagErr }}</span></span>

        <div class="tags-container">
        <ul class="tags-list">
            <li v-for="(tag, index) in tags">
                <span class="remove" @click="removeTag(index)">x</span> <span class="tag">{{ tag }}</span></li>
            </ul>
        </div>

      <button class="pinkbtn" @click="saveRecipe">save recipe</button>
<span style="color: red">{{ error }}</span>
    </div>


</div>
</template>
<script>
export default {
data(){
    return {
        newRecipe: {
            name: '',
            instructions: ''
        },
        newIngredient: '',
        ingredients: [],
        newTag: '',
        tags: [],
        error: '',
        tagErr: '',
        ingrErr: ''
    }
},

methods: {

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
