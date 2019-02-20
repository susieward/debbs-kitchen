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
  padding: 30px;
  grid-gap: 30px;
    background-color: #f9f9f9;
    }



    .tags-title {
    font-weight: 400;

    }



</style>
