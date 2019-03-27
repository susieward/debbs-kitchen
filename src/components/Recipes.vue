<template>
<div class="recipes">

<div class="recipes-title">
<h1>Recipes</h1>
    <div class="recipes-nav"><router-link to="/recipes">all recipes</router-link> | <router-link to="/recipes/new">add new</router-link> | <router-link to="/recipes/drafts">drafts</router-link>
    </div>
    </div>

    <div class="recipes-container">
  <router-view></router-view>

    </div>
    </div>

</template>
<script>

export default {
  data(){
    return {
    }
  },

name: 'Recipes'



}
</script>
<style>

.recipes {
display: grid;
min-height: 500px;
width: 900px;
padding: 30px;
align-content: flex-start;
justify-content: center;
background-color: #f9f9f9;
}





    .recipes-title {
    width: 100%;
    text-align: center;
    padding: 20px;
    }

    .recipes h1 {
    padding-top: 0;
margin-top: 0;
font-weight: 300;
font-size: 34px;
text-align: center;
    }

    .recipes-nav {

    }

    .recipes-nav a {
    text-decoration: none;
    color: #F08080;
    padding-bottom: 2px;
    border-bottom: 1px solid transparent;

    }

    .recipes-nav a:hover {
      color: #000;
    }

    .recipes-nav a.router-link-exact-active {
      color: #000;
      border-bottom: 1px solid #F08080;
    }

.recipes-container {
display: grid;
align-content: flex-start;
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

    .recipes {
      width: 850px;
    }
    }

    @media screen and (max-width: 1000px){

    .recipes {
      width: 800px;
    }


    }

    @media screen and (max-width: 970px){

    .recipes {
      width: 700px;
    }

    .recipes h1 {

    font-size: 30px;
    }
    }

    @media screen and (max-width: 766px){

    .recipes {
      width: 550px;
      padding: 20px;
    }

    .recipes h1 {

    font-size: 28px;
    }
    }

    @media screen and (max-width: 590px){

    .recipes {
      width: 420px;
    }
    }

    @media screen and (max-width: 400px){

    .recipes {
      width: 350px;
      padding-left: 5px;
      padding-right: 5px;
    }

    .recipes h1 {

    font-size: 25px;
    }
    }


</style>
