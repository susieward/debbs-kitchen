<template>
<div class="tag-results">

  <div class="tag-results-back">

    </div>

    <div class="tag-results-container">

<div class="tags-title">
<h1>{{ searchTotal }} results for: {{ search }}</h1>

    </div>

    <div class="tags-container">
      <p v-if="recipeNameResults.length">
        Recipes:
      <br />
      <ul>
        <li v-for="recipe in recipeNameResults">
          <router-link :to="{ name: 'RecipePage', params: { id: recipe._id }}">{{ recipe.name }}</router-link>
        </li>
      </ul>
</p>

<p v-if="tagSearchResults.length">
  Tags:
<br />
<ul class="tags-ul">
  <li v-for="tag in tagSearchResults" @click="findTag(tag)">
  <span>{{ tag }}</span>
  </li>
</ul>

</p>

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

      searchesCombined(){

        var arr1 = this.tagSearchResults;
        var arr2 = this.recipeNameResults;

        var arrs = [arr1, arr2];
        return [].concat(...arrs);
      },

      searchTotal(){

        return this.searchesCombined.length;

      },

        search(){
          return this.$route.params.search;
        },


        recipes(){

          return this.$store.state.recipes;
        },

          recipeNames(){

            return this.$store.getters.recipeNames;


          },


          recipeNameWords(){

            var names = this.recipeNames;


            var newArr = [];
            names.forEach((name) => {



              newArr.push.apply(newArr, name.split(" "));

            })

            return newArr;

          },

          tags(){
            return this.$store.getters.tags;
          },


          uniqueTags(){

            return this.$store.getters.uniqueTags;
          },

          uniqueWords(){

            return this.$store.getters.uniqueWords;
          },

          tagsAndRecipes(){

            return this.$store.getters.tagsAndRecipes;

          },


          tagSearchResults(){

            var lowSearch = this.search.toLowerCase();

            return this.uniqueTags.filter(tag => tag.toLowerCase().includes(lowSearch));

          },

          taggedRecipeResults(){

            var lowSearch = this.search.toLowerCase();

            return this.recipes.filter(recipe => recipe.tags.some(tag => tag === lowSearch));


          },

          recipeNameResults(){

            var lowSearch = this.search.toLowerCase();


           return this.recipes.filter(recipe => recipe.name.toLowerCase().includes(lowSearch));


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

  methods: {
    findTag: function(tag){

    this.selectedTag = tag;

    this.$router.push({ name: 'TagResults', params: { selectedTag: this.selectedTag }});

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

    .tags-ul {

    }

    .tags-ul li span {
      color: #F08080;
      border-bottom: 1px solid #ddd;
      padding-bottom: 2px;
      cursor: pointer;
      font-size: 18px;
      display: inline;
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
      width: 350px;
      padding-left: 5px;
      padding-right: 5px;
      }

      .tag-results h1 {
        font-size: 25px;
      }


    }


</style>
