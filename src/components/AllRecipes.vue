<template>
<div class="all-recipes">
  <div v-for="recipe in sortedRecipes" :key="recipe._id" class="all-recipes-container">
    <recipe :recipe="recipe"></recipe>
  </div>
</div>
</template>
<script>
import Recipe from './Recipe.vue'
export default {
name: 'AllRecipes',
components: {
  Recipe
},
computed: {
  recipes() {
    return this.$store.state.recipes;
  },
  sortedRecipes(){
    function compare(a, b){
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();

      if(nameA < nameB) return -1;
      if(nameA > nameB)
          return 1;
          return 0;
    }
    return this.recipes.sort(compare);
  }
}
}
</script>
<style>
.all-recipes {
display: grid;
align-content: flex-start;
justify-content: center;
  padding: 30px;
  grid-gap: 60px;
    background-color: #f9f9f9;
    }

    .all-recipes-container {
      display: grid;
      justify-content: center;
    }

    @media screen and (max-width: 766px){

      .all-recipes {
padding: 20px;
      }

      .all-recipes-container {

      }

    }

    @media screen and (max-width: 590px){

      .all-recipes {
        padding-right: 0;
        padding-left: 0;
      }

      .all-recipes-container {

      }

    }
</style>
