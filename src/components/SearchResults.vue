<template>
<div class="tag-results">

  <div class="tag-results-back">

    </div>

    <div class="tag-results-container">

<div class="tags-title">
<h1>{{ searchTotal }} results for: {{ search }}</h1>

    </div>

    <div class="tags-container">
      <div v-for="recipe in searchTagged">
        {{ recipe.name }}
      </div>

      <div v-for="result in searchResults">


{{ result }}



      </div>


    </div>
    </div>
  </div>
</template>
<script>
export default {

data(){
    return {

    }
},
name: 'SearchResults',

    computed: {

      searchTotal(){

        return this.searchResults.length;
      },

        search(){
          return this.$route.params.search;
        },


        recipes(){

          return this.$store.state.recipes;
        },

          recipeNames(){

            return this.recipes.map(recipe => recipe.name);


          },

          tags(){
            return this.recipes.map(recipe => recipe.tags);
          },

          tagsList(){

            var t = this.tags;

            return [].concat(...t);

          },

          uniqueTags(){

            var list = this.tagsList;

            var unique = [...new Set(list)];

            return unique;
          },

          tagsAndRecipes(){

            var arr1 = this.recipeNames;
            var arr2 = this.uniqueTags;

            var arrs = [arr1, arr2];

            return [].concat(...arrs);

          },


          searchTags(){

            var lowSearch = this.search.toLowerCase();

            return this.uniqueTags.filter(tag => tag.toLowerCase().includes(lowSearch));

          },

          searchTagged(){

            var lowSearch = this.search.toLowerCase();

            return this.recipes.filter(recipe => recipe.tags.some(tag => tag === lowSearch));


          },


        searchResults(){

          var lowSearch = this.search.toLowerCase();

          return this.tagsAndRecipes.filter(item => item.toLowerCase().includes(lowSearch));



        },

        sortedResults: function(){

          function compare(a, b){

            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();

            if(nameA < nameB)

               return -1;

            if (nameA > nameB)

              return 1;

            return 0;
        }

        return this.results.sort(compare);
      }
  },

    filters: {
        pick: function (objects, key) {
            return objects.map(function(object) {
    	       return object[key];

     })
        }
    }

}
</script>
<style>
.tag-results {
display: grid;

align-content: flex-start;


}

.tag-results-container {
display: grid;
min-height: 500px;
max-width: 900px;
padding: 30px;
align-content: flex-start;
    background-color: #f9f9f9;
}

.tag-results-back {
  display: grid;
  justify-content: flex-start;
  align-content: center;
  padding-bottom: 20px;

}

    .tags-title {
    width: 100%;
    text-align: center;
    padding: 20px;
    }

    .tag-results h1 {

font-weight: 300;
font-size: 34px;
text-align: center;
    }

    .results-recipe-name {
       font-weight: 400;
       font-size: 20px;
       }

       .results-recipe-name:hover {
         color: #000;
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
