<template>
<div class="tag-results">

  <div class="tag-results-back">
    <router-link to="/tags" class="regular">&#x27F5; all tags</router-link>
    </div>

    <div class="tag-results-container">

<div class="tags-title">
<h1>Recipes tagged: {{ selectedTag }}</h1>

    </div>

    <div class="tags-container">

      <div v-for="recipe in sortedResults">


        <router-link :to="{ name: 'RecipePage', params: { id: recipe._id, selectedTag: selectedTag }}"><p class="results-recipe-name">{{ recipe.name }}</p></router-link>


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
name: 'TagResults',

props: ['selectedTag'],

    computed: {


        recipes(){
            return this.$store.state.recipes;
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

        sortedTags(){

          return this.uniqueTags.sort();
        },

        results(){

            return this.recipes.filter(recipe => recipe.tags.some(tag => tag === this.selectedTag));
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
width: 900px;
padding: 30px;
align-content: flex-start;
    background-color: #f9f9f9;
}

.tag-results-back {
  display: none;
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

    @media screen and (max-width: 1200px){

      .tag-results-container {
      width: 850px;
      padding: 30px;
      }


    }

    @media screen and (max-width: 1000px){

      .tag-results-container {
      width: 800px;
      padding: 30px;
      }


    }

    @media screen and (max-width: 970px){

      .tag-results-container {
      width: 700px;
      padding: 30px;
      }

      .tag-results h1 {
        font-size: 30px;
      }


    }

    @media screen and (max-width: 766px){

      .tag-results-container {
      width: 550px;
      padding: 20px;
      }

      .tag-results h1 {
        font-size: 28px;
      }


    }

    @media screen and (max-width: 590px){

      .tag-results-container {
      width: 420px;

      }

      .tag-results h1 {
        font-size: 28px;
      }


    }

    @media screen and (max-width: 400px){

      .tag-results-container {
      width: 380px;
      padding-left: 5px;
      padding-right: 5px;
      }

      .tag-results h1 {
        font-size: 25px;
      }


    }


</style>
