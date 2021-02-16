<template>
<div class="recipe">
  <router-link :to="url">
    <p><span class="recipe-name">{{ recipe.name }}</span></p>
  </router-link>
  <div class="photo-link-container" v-if="recipe.photo !== ''">
      <router-link :to="url">
        <img class="recipe-photo-link" :src="recipe.photo">
      </router-link>
  </div>
  <div class="tags-box">
    Tags: <span class="tag" v-for="tag in recipe.tags" @click="findTag(tag)">{{ tag }}</span>
  </div>
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
  props: {
    recipe: {
      required: true
    }
  },
  computed: {
    url(){
      return `/recipe/${this.recipe._id}`
    }
  },
  methods: {
    findTag(tag){
      this.selectedTag = tag;
      this.$router.push({ name: 'TagResults', params: { selectedTag: this.selectedTag }});
    }
  }
}
</script>
<style>

.recipe {
display: grid;
align-content: flex-start;
justify-content: flex-start;
margin: 0 auto;
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


    @media screen and (max-width: 1200px){

      .recipe {
        width: 600px;
      }

      .photo-link-container img {
        width: 600px;

      }


    }

    @media screen and (max-width: 1000px){

      .recipe {
        width: 600px;
      }

      .photo-link-container img {
        width: 600px;

      }


    }


    @media screen and (max-width: 970px){

      .recipe {
        width: 600px;
      }

      .photo-link-container img {
        width: 600px;

      }



    }

    @media screen and (max-width: 766px){

      .recipe {
        width: 500px;
      }

      .photo-link-container img {
        width: 500px;

      }

      .recipe-name {
        font-size: 20px;
      }

    }

    @media screen and (max-width: 590px){

      .recipe {
        width: 380px;
      }

      .photo-link-container img {
        width: 380px;


      }

    }

    @media screen and (max-width: 400px){

      .recipe {
        width: 340px;
        padding-right: 5px;
        padding-left: 5px;
      }

      .photo-link-container img {
        width: 340px;

      }

    }



</style>
