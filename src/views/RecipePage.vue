<template>
<div class="recipe-page">

  <div class="recipe-back">
    <router-link :to="{ name: 'TagResults', params: { selectedTag: this.tag }}" class="regular" v-if="this.tag">&#x27F5; tagged: {{ tag }}</router-link>
      <router-link to="/recipes" class="regular" v-if="!this.tag">&#x27F5; all recipes</router-link>
      </div>
<div id="recipePrint">
    <div class="recipe-page-container">
    <div class="recipe-top">
        <div class="recipe-name-div"><span v-if="showRecipeEditor === false">{{ recipe.name }}</span><span v-if="showRecipeEditor === true">Edit recipe</span></div>
        <div class="recipebtns">
            <span><button class="greybtn" @click="openRecipeEditor(recipe)" v-if="showRecipeEditor == false">edit recipe</button><button class="pinkbtn" v-if="showRecipeEditor === false" v-print>print</button> </span>
            <span>

      <button class="greybtn" @click="closeRecipeEditor" v-if="showRecipeEditor == true">close editor</button>
    </span>
    </div>
    </div>
    <div class="recipe-container" v-if="showRecipeEditor == false">

      <div class="recipe-photo-container">
      <img class="recipe-photo" :src="recipe.photo">
    </div><br />
          <span class="section">Ingredients:</span>
            <ul class="recipe-ingredients">
            <li v-for="(ingredient, index) in recipe.ingredients">{{ ingredient.text }}</li>
          </ul>
      <p class="section">Directions:</p>
        <div class="recipe-directions">
        <div v-for="box in recipe.instructions">
          <div v-if="box.hasImage === false">
          <p class="directions-text" v-html="box.text"></p>
          </div>

        <div class="recipe-box-img-container" v-if="box.hasImage === true">
          <img class="recipe-box-img" :src="box.image" />
        </div>
      </div>
    </div>
    <RecipeTags :selectedTag="selectedTag" :recipe="recipe"></RecipeTags>
    </div>

    <recipe-editor v-if="showRecipeEditor == true" :recipe="selectedRecipe" @close="closeRecipeEditor"></recipe-editor>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
data(){
    return {
        showRecipeEditor: false,
        selectedRecipe: undefined,
        output: null
    }
},
name: 'RecipePage',
props: ['selectedTag'],
components: {
  RecipeTags: () => import('@/components/RecipeTags.vue'),
  RecipeEditor: () => import('@/components/RecipeEditor.vue')
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
    openRecipeEditor(recipe){
        this.showRecipeEditor = true;
        this.selectedRecipe = recipe;
    },
    closeRecipeEditor(){
        this.showRecipeEditor = false;
    }
  }
}
</script>
<style>


.button-link {
  text-decoration: none;
  color: #F08080;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;

}

.section {

font-family: 'Nunito Medium';
}

.recipe-photo-container {
  display: grid;
  width: 100%;
justify-content: center;
margin-bottom: 20px;
}

.recipe-photo {
  height: 400px;
  width: 700px;
  object-fit: cover;
}

    .recipe-page {
display: grid;

align-content: flex-start;


}

    .recipe-page-container {
       display: grid;
min-height: 500px;
width: 900px;
padding: 30px;
align-content: flex-start;
justify-content: center;
background-color: #f9f9f9;
    }



    .recipe-container {
display: grid;
align-content: flex-start;
padding: 30px;
font-size: 18px;
margin: auto;
}

.tags-section {
  margin-top: 20px;
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
    display: none;
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
    padding: 0;
    margin-left: 25px;
        }

        .recipe-ingredients li {
          display: block;
          border-left: 1px solid #F08080;
          padding-left: 25px;
          padding-top: 0;
          margin-top: 0;
          padding-bottom: 4px;
          font-size: 16px;


        }

        .recipe-ingredients li:first-child {
        padding-top: 0;

        margin: 0;
        }

        .recipe-ingredients li:last-child {
        padding-bottom: 0;
        }

        .recipe-directions {
          display: grid;
          align-content: flex-start;
          grid-gap: 30px;
        }


        .directions-text {
        line-height: 28px;
        margin: 0;
        padding: 0;

        }

        .directions-text p {
          margin: 0;
          padding: 0;
        }

        .recipe-box-img-container {
          display: grid;
          justify-content: center;

        }

      .recipe-box-img {
        height: auto;
  width: 600px;
        object-fit: cover;


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

    @media screen and (max-width: 1200px){
      .recipe-page-container {

         width: 850px;
         padding: 30px;

      }

      .recipe-photo-container {
        display: grid;
        width: auto;
      justify-content: center;
      margin-bottom: 20px;

      }

      .recipe-photo {
        height: 400px;
        width: 600px;
        object-fit: cover;
      }

    }

    @media screen and (max-width: 1000px){
      .recipe-page-container {

         width: 800px;


      }

      .recipe-photo {
        height: 400px;
        width: 600px;
        object-fit: cover;
      }

    }


    @media screen and (max-width: 970px){
      .recipe-page-container {

         width: 700px;


      }

      .recipe-photo {
        height: 400px;
        width: 500px;
        object-fit: cover;
      }

      .recipe-container {


        padding: 20px;

    }

  }

    @media screen and (max-width: 766px){
      .recipe-page-container {

         width: 550px;


      }

      .recipe-name-div {
        font-size: 25px;
      }

      .recipe-photo {
        height: 400px;
        width: 450px;
        object-fit: cover;
      }

      .recipe-box-img {
        width: 500px;
      }




  }


    @media screen and (max-width: 590px){

      .recipe-page {

      }
      .recipe-page-container {

         width: 420px;


      }

      .recipe-container {

      }

      .recipe-name-div {
        font-size: 20px;
      }

      .recipe-photo {
        height: 400px;
        width: 360px;

      }

      .recipe-box-img {
        width: 400px;
      }

    }

    @media screen and (max-width: 400px){
      .recipe-page-container {

         width: 360px;
         padding-left: 15px;
         padding-right: 15px;

      }

      .recipe-container {

font-size: 16px;
line-height: 25px;
        padding: 10px;

    }

      .recipe-photo {
        height: 400px;
        width: 340px;

      }

      .recipe-box-img {
        width: 350px;
      }

    }



        @media print {

          .recipe-page-container {

             width: 800px;
             border: 1px solid #eee;


          }

          .recipe-container {
            min-width: 700px;
          }

          .recipe-photo {
            height: 400px;
            width: 450px;
            object-fit: cover;
          }

          .recipe-box-img {
            width: 300px;
          }

          .recipebtns {
            display: none;
          }

          #tags-paragraph {
            display: none;
          }

        }



</style>
