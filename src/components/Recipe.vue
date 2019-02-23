<template>
<div class="recipe">

    <router-link :to="url"><p><span class="recipe-name">{{ recipe.name }}</span></p></router-link>


    <div class="recipe-photo-container">


          <router-link :to="url"><img class="recipe-photo-link" :src="recipe.photo"></router-link>
        </div>

            <div class="tags-box">

          Tags: <span class="tag" v-for="tag in recipe.tags" @click="findTag(tag)">{{ tag }}</span></div>



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
display: grid;
justify-content: flex-start;
width: 700px;
}
 .recipe-name {
    font-weight: 300;
    font-size: 24px;
    display: inline;

    }

    .recipe-name:hover {
      color: #000;
    }



    .title {
       font-weight: 400;
        margin-top: 0;
    }

    .section {
      font-family: 'Nunito Medium';
    }

    .tags-box {

font-weight: 300;
padding-top: 10px;
padding-bottom: 20px;

    }

    .recipe-photo-link {
      height: 400px;
      width: 700px;
      object-fit: cover;
      cursor: pointer;
    }






</style>
