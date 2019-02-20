<template>
<div class="recipe">

    <router-link :to="url"><p><span class="recipe-name">{{ recipe.name }}</span></p></router-link>

    <img class="recipe-box-img" :src="recipe.photo"><br /><br />

     <span style="font-weight: 400">Ingredients:</span>
            <ul class="recipe-ingredients">
            <li v-for="ingredient in recipe.ingredients">{{ ingredient }}</li>
            </ul>
<p style="font-weight: 400">Directions:</p>
            <div v-for="box in recipe.instructions">
              <p v-if="box.hasImage === false">
                {{ box.text}}
              </p>
              <img class="recipe-box-img" v-if="box.hasImage === true" :src="box.image" />
            </div>

            <p><span class="tags-title">Tags:</span> <span class="tag" v-for="tag in recipe.tags" @click="findTag(tag)">{{ tag }}</span></p>



</div>
</template>
<script>
export default {
  data(){
    return {
      selectedTag: ''
    }
  },
    name: 'Recipe',

    props: ['recipe'],
      computed: {
    url(){
      return `/recipe/${this.recipe._id}`
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

.recipe {

}
 .recipe-name {
    font-weight: 400;
    font-size: 22px;
    display: inline;

    }

    .recipe-name:hover {
      color: #000;
    }



    .title {
       font-weight: 400;
        margin-top: 0;
    }

    .tags-title {
    font-weight: 400;

    }

    .recipe-box-img {
        width: 300px;
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





</style>
