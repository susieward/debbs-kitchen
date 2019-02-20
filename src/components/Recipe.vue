<template>
<div class="recipe">

    <router-link :to="url"><p class="recipe-name">{{ recipe.name }}</p></router-link>
     <span>Ingredients:</span>
            <ul>
            <li v-for="ingredient in recipe.ingredients">{{ ingredient }}</li>
            </ul>
<p>Directions:</p>
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





</style>
