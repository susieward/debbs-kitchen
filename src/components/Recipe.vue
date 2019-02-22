<template>
<div class="recipe">

    <router-link :to="url"><p><span class="recipe-name">{{ recipe.name }}</span></p></router-link>


    <div class="recipe-photo-container">


          <img class="recipe-photo" :src="recipe.photo">
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
width: 750px;
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

      .recipe-box-img-container {
        display: grid;
        justify-content: center;

      }

    .recipe-box-img {
      height: auto;
width: 700px;
      object-fit: cover;


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
