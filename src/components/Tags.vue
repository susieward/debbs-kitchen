<template>
<div class="tags">

<div class="tags-title">
<h1>Tags</h1>

    </div>

    <div class="tags-container">

      <div>
      <ul class="tags-list">

        <li v-for="tag in sortedTags" @click="findTag(tag)"><span>{{ tag }}</span></li>

      </ul>
    </div>




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
name: 'Tags',


    computed: {

        recipes(){
            return this.$store.state.recipes;
        },

        tags(){
          return this.$store.getters.tags;
        },

        sortedTags(){

          return this.$store.getters.sortedTags;
        }
    },

    methods: {



      findTag: function(tag){

      this.selectedTag = tag;

      this.$router.push({ name: 'TagResults', params: { selectedTag: this.selectedTag }});

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

    .draggable-item-horizontal {
        height: 300px;
        width: 100px;
        padding: 10px;
        border: 1px solid #ddd;
    }

.tags {
display: grid;
min-height: 500px;
max-width: 900px;
padding: 30px;
align-content: flex-start;
    background-color: #f9f9f9;
}



    .tags-title {
    width: 100%;
    text-align: center;
    padding: 20px;
    }

    .tags h1 {
    padding-top: 0;
margin-top: 0;
font-weight: 300;
font-size: 34px;
text-align: center;
    }



    .tags-list {
    list-style-type: none;
margin: 0;
        }

        .tags-list li {

    display: block;
    border: none;
        }

        .tags-list li span {
            margin: 6px;
            color: #F08080;
            border-bottom: 1px solid #ddd;
            padding-bottom: 2px;
            cursor: pointer;
            font-size: 18px;
            display: inline-block;
          }

          .tags-list li span:hover {
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

      .tags {
      width: 850px;
      padding: 30px;
      }


    }

    @media screen and (max-width: 1000px){

      .tags {
      width: 800px;
      padding: 30px;
      }


    }

    @media screen and (max-width: 970px){

      .tags {
      width: 700px;
      padding: 30px;
      }

      .tags h1 {
        font-size: 30px;
      }


    }

    @media screen and (max-width: 766px){

      .tags {
      width: 550px;
      padding: 20px;
      }

      .tags h1 {
        font-size: 28px;
      }


    }

    @media screen and (max-width: 590px){

      .tags {
      width: 420px;

      }

      .tags h1 {
        font-size: 28px;
      }


    }

    @media screen and (max-width: 400px){

      .tags {
      width: 350px;
      padding-left: 5px;
      padding-right: 5px;
      }

      .tags h1 {
        font-size: 25px;
      }


    }


</style>
