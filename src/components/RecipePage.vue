<template>
<div class="recipe-page">

  <div class="recipe-back">
    <router-link :to="{ name: 'TagResults', params: { selectedTag: this.tag }}" class="regular" v-if="this.tag">&#x27F5; tagged: {{ tag }}</router-link>
      <router-link to="/recipes" class="regular" v-if="!this.tag">&#x27F5; all recipes</router-link>
      </div>
    <div class="recipe-page-container">
    <div class="recipe-top">

        <div class="recipe-name">{{ recipe.name }}</div>

        <div class="recipebtns">
            <span>
            <button class="greybtn" @click="openRecipeEditor(recipe)" v-if="showRecipeEditor == false">edit recipe</button>
                    <button class="greybtn" @click="closeRecipeEditor" v-if="showRecipeEditor == true">close editor</button>

        <button class="blackbtn" @click="deleteRecipe(recipe._id)" v-if="showRecipeEditor == false">delete recipe</button>
                </span>
    </div>
    </div>
    <div class="recipe-container" v-if="showRecipeEditor == false">
          <span>
            Ingredients:
          </span>
            <ul>
            <li v-for="ingredient in recipe.ingredients">{{ ingredient }}</li>
            </ul>
            <p>{{ recipe.instructions }}</p>
            <p><span class="tags-title">Tags:</span> <span class="tag" v-for="tag in recipe.tags" @click="findTag(tag)">{{ tag }}</span></p>
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
}

    .recipe-top {
    width: 100%;
    display: grid;
    padding: 20px;
        padding-bottom: 0;
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

 .recipe-name {
      display: grid;
    justify-content: flex-start;
    font-weight: 400;
    font-size: 26px;

    }

    .tags-title {
    font-weight: 400;

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
