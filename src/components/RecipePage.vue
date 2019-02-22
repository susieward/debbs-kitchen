<template>
<div class="recipe-page">

  <div class="recipe-back">
    <router-link :to="{ name: 'TagResults', params: { selectedTag: this.tag }}" class="regular" v-if="this.tag">&#x27F5; tagged: {{ tag }}</router-link>
      <router-link to="/recipes" class="regular" v-if="!this.tag">&#x27F5; all recipes</router-link>
      </div>
    <div class="recipe-page-container">
    <div class="recipe-top">

        <div class="recipe-name-div"><span v-if="showRecipeEditor === false">{{ recipe.name }}</span></div>

        <div class="recipebtns">
            <span>
            <button class="greybtn" @click="openRecipeEditor(recipe)" v-if="showRecipeEditor == false">edit recipe</button>
                    <button class="greybtn" @click="closeRecipeEditor" v-if="showRecipeEditor == true">close editor</button>

        <button class="blackbtn" @click="deleteRecipe(recipe._id)" v-if="showRecipeEditor == false">delete recipe</button>
                </span>
    </div>
    </div>
    <div class="recipe-container" v-if="showRecipeEditor == false">

<div class="recipe-photo-container">


      <img class="recipe-photo" :src="recipe.photo">
    </div><br />

          <span class="section">Ingredients:</span>
            <ul class="recipe-ingredients">
            <li v-for="ingredient in recipe.ingredients">{{ ingredient }}</li>
          </ul><br />
            <span class="section">Directions:</span>
                        <div v-for="box in recipe.instructions">
                          <p v-if="box.hasImage === false">
                            {{ box.text}}
                          </p>

                          <div class="recipe-box-img-container" v-if="box.hasImage === true">

                          <img class="recipe-box-img" :src="box.image" />
                        </div>

                        </div>
            <p><span class="section">Tags:</span> <span class="tag" v-for="tag in recipe.tags" @click="findTag(tag)">{{ tag }}</span></p>
    </div>

    <recipe-editor v-if="showRecipeEditor == true" :recipe="selectedRecipe" @close="closeRecipeEditor"></recipe-editor>



    </div>

</div>
</template>
<script>
import axios from 'axios'
import RecipeEditor from './RecipeEditor.vue'
export default {
data(){
    return {
        showRecipeEditor: false,
        selectedRecipe: undefined

    }
},
    name: 'RecipePage',


props: ['selectedTag'],

    components: {
        RecipeEditor
    },


    computed: {

      tag(){

        return this.$route.params.selectedTag;

      },

    id(){
      return this.$route.params.id
    },

    recipe(){
      return this.$store.getters.getRecipeById(this.id)
    }
    },

    methods: {

      findTag: function(tag){

      this.selectedTag = tag;

      this.$router.push({ name: 'TagResults', params: { selectedTag: this.selectedTag }});

    },

        openRecipeEditor: function(recipe){
            this.showRecipeEditor = true;
            this.selectedRecipe = recipe;

        },

        closeRecipeEditor: function(){
            this.showRecipeEditor = false;

        },


        deleteRecipe: function(_id){


            let path = 'http://localhost:3000/recipes/' +_id;

            axios.delete(path).then((response) => {
                this.$store.commit('deleteRecipe', {id: response.data});

                this.$router.push('/recipes');
                this.$store.dispatch('loadRecipes');
                 });



            }


    }
}
</script>
<style>

.section {

font-family: 'Nunito Medium';
}

.recipe-photo-container {
  display: grid;
  width: 100%;

margin-bottom: 20px;
}

.recipe-photo {
  height: 400px;
  width: 100%;
  object-fit: cover;
}

    .recipe-page {
display: grid;

align-content: flex-start;


}

    .recipe-page-container {
       display: grid;
min-height: 500px;
max-width: 900px;
padding: 30px;
align-content: flex-start;
background-color: #f9f9f9;
    }

    .recipe-container {
display: grid;
align-content: flex-start;
padding: 30px;
font-size: 18px;

margin: auto;
}

    .recipe-top {
    width: 100%;
    display: grid;
    padding: 20px;
        padding-bottom: 0;
        margin-bottom: 20px;
        align-content: center;
    grid-template-columns: auto auto;

    }

    .recipe-back {
    display: grid;
    justify-content: flex-start;
    align-content: center;
    padding-bottom: 20px;

    }

    .recipebtns {
    display: grid;
    justify-content: flex-end;
    }

 .recipe-name-div {
      display: grid;
    justify-content: flex-start;
    font-weight: 300;
    font-size: 30px;
    }

    .tags-title {


    }


        .recipe-ingredients {
        list-style-type: none;
    margin-left: 8px;
    padding: 0;
        }

        .recipe-ingredients li {
          display: block;
          border-left: 1px solid #F08080;
          padding-left: 25px;





        }



       .greybtn {
     border: none;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #ddd;
    padding: 6px 8px;
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
    padding: 6px 8px;
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
    padding: 6px 8px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
   max-width: 150px;
    }

</style>
