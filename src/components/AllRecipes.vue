<template>

  <div class="all-recipes">

        <div v-for="recipe in sortedRecipes" :key="recipe._id">
            <recipe :recipe="recipe"></recipe>
      </div>

        </div>

</template>
<script>
import Recipe from './Recipe.vue'
export default {
  data(){
    return {

    }
  },
    name: 'AllRecipes',

    components: {
        Recipe
    },

mounted: function(){

  this.$store.dispatch('loadRecipes');

},

    computed: {
        recipes() {
        return this.$store.state.recipes;
      },

      sortedRecipes: function(){
        function compare(a, b){

          var nameA = a.name.toLowerCase();
          var nameB = b.name.toLowerCase();

          if(nameA < nameB)
          return -1;

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





</style>
