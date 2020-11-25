<template>
<div class="tagged-recipe">

  <div class="tagged-recipe-back">
    <router-link :to="{ name: 'TagResults', params: { selectedTag: this.selectedTag }}" class="regular">&#x27F5; tagged: {{ selectedTag }}</router-link>
    </div>

    <div class="tagged-recipe-container">

<div class="tagged-recipe-title">
<h1>{{ recipe.name }}</h1>

    </div>

    <div class="tags-container">
      {{ id }}
      <div class="recipe-container">
            <span>
              Ingredients:
            </span>
              <ul>
              <li v-for="ingredient in recipe.ingredients">{{ ingredient }}</li>
              </ul>
              <p>{{ recipe.instructions }}</p>
              <p><span class="tags-title">Tags:</span> <span class="tag" v-for="tag in recipe.tags" @click="findTag(tag)">{{ tag }}</span></p>
      </div>

    </div>
    </div>
  </div>
</template>
<script>
export default {
data(){
    return {
        selectedTag: ''

    }
},
name: 'TaggedRecipe',
props: ['selectedTag', 'id'],

components: {
    Recipe: () => import('@/components/Recipe.vue')
},

    computed: {


        recipes(){
            return this.$store.state.recipes;
        },

        tags(){
          return this.recipes.map(recipe => recipe.tags);
        },

        recipe(){

          return this.recipes.find(r => r._id === this.id);
        }

    },

    methods: {

      findTag: function(tag){

      this.selectedTag = tag;

      this.$router.push({ name: 'TagResults', params: { selectedTag: this.selectedTag }});

      }
    }

}
</script>
<style>

.tagged-recipe {
display: grid;

align-content: flex-start;


}

.tagged-recipe-container {
display: grid;
min-height: 500px;
max-width: 900px;
padding: 30px;
align-content: flex-start;
    background-color: #f9f9f9;
}

.tagged-recipe h1{

font-weight: 300;
font-size: 34px;
text-align: center;
}

    .tagged-recipe-title {
    width: 100%;
    text-align: center;
    padding: 20px;
    }

    .tagged-recipe-back {
      display: none;
      justify-content: flex-start;
      align-content: center;
      padding-bottom: 20px;

    }







    .recipes-nav {

    }

    .recipes-nav a {
    text-decoration: none;
    color: #F08080;

    }

.tags-container {
display: grid;
align-content: flex-start;
padding: 30px;
font-size: 18px;
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
