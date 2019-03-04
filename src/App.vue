<template>
  <div id="app">

    <div class="menu-overlay">
                        <a href="javascript:void(0)" class="menu-closebtn">&times;</a>
            <ul class="menu">
                <li><router-link to="/">planner</router-link></li>
                <li><router-link to="/recipes">recipes</router-link></li>
                <li><router-link to="/menus">menus</router-link></li>
                <li><router-link to="/tags">index</router-link></li>

                </ul>
            </div>

      <div class="header">

         <div class="header-container">


           <div class="title-and-links">

             <div class="icon-nav">
             <a href="javascript:void()" class="icon-item"><i class="material-icons">
  menu
  </i>
     </a>



                </div>

             <div class="title">
              <h1 style="cursor: pointer" @click="goToHome">Debb's kitchen</h1>
             </div>

             <div class="links">
              <nav>
            <router-link to="/">planner</router-link>
            <router-link to="/recipes">recipes</router-link>
            <router-link to="/menus">menus</router-link>
            <router-link to="/tags">index</router-link>

            </nav>
             </div>
             </div>


             <div class="search">
            <input type="text" id="bar" v-model="search" placeholder="search..." @keyup.enter="startSearch"/>
            </div>
          </div>
      </div>
      <div class="main">


      <div class="content">

    <router-view @route="displayPrevRoute"></router-view>
          </div>
      </div>
    <div class="footer">
      <div class="footer-container">
        <p>
          &copy; Debbie Ward 2019<br />
          website by <a href="https://susieward.io">Susie Ward</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      prevRoute: null,
      name: '',
      search: ''
    }
  },
  name: 'App',

  computed: {

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




    searchResults(){

      var lowSearch = this.search.toLowerCase();

      return this.tagsAndRecipes.filter(item => item.toLowerCase() === lowSearch);



    }

  },

  methods: {

    goToHome: function(){

      this.$router.push({ name: 'Home'});

    },

    startSearch: function(){

      this.$router.push({ name: 'SearchResults', params: { search: this.search }});
    },

    displayPrevRoute: function(prevRoute){
      this.prevRoute = prevRoute;

      this.name = this.prevRoute.params.name;

    }
  }
}
</script>
<style>

#app {
display: grid;
grid-template-areas: "header header"
                    "main main"
                    "footer footer";
min-height: 100vh;
}

.header {
grid-area: header;
display: grid;
padding: 40px;
height: 117px;
width: 100vw;
text-align: center;
background-color: #ecc77e;
margin-bottom: 60px;

}

.header-container {
display: grid;
grid-template-areas: "left search";
grid-template-columns: auto auto;
align-content: center;

}



.icon-nav {
  display: none;
}

.title-and-links {
display: grid;
grid-area: left;
grid-template-areas: "title links";
justify-content: flex-start;
grid-gap: 50px;
}

.title {
grid-area: title;
display: grid;
justify-content: flex-start;
align-content: center;
width: auto;
}

.header h1 {
margin: 0;
padding: 0;
color: #fff;
text-transform: uppercase;
font-weight: normal;
text-align: left;
font-size: 35px;
font-family: 'Gotham Rounded Medium';
letter-spacing: 0.03em;

text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
}

/* MAIN */
.main {
grid-area: main;
display: grid;
grid-gap: 40px;
width: 100vw;
}

/* CONTENT */

.content {
display: grid;
justify-content: center;
padding: 0;
}

.back-button {

    display: grid;
    justify-content: flex-start;
    align-content: center;
    padding-bottom: 20px;

}
/* LINKS */

.links {
grid-area: links;
display: grid;
align-content: center;
}

.links-container {
display: grid;
padding: 10px;
}


nav {
display: grid;
grid-gap: 30px;
grid-template-columns: auto auto auto auto;
padding: 0;
margin: 0;
align-content: center;
}

nav a {
display: inline-block;
text-align: center;
color: #fff;
padding: 0px;
font-size: 18px;
letter-spacing: 0.03em;
transition: 0.3s;
font-family: 'Gotham Rounded Medium';
text-transform: uppercase;
line-height: normal;
margin: 0;

}

nav a:hover {
color: #444;
}

nav a.router-link-exact-active {
color: #444;
}

/* SEARCH BAR */

.search {
grid-area: search;
display: grid;
align-content: center;
justify-content: flex-end;

}

#bar {
width: 200px;
border: 1px solid #eee;
border-radius: 6px;
padding: 6px 12px;
font-family: 'Proxima Nova Light';
font-size: 18px;

}

.footer {
  display: grid;
  min-height: 120px;
  justify-content: center;
  width: 100vw;
  margin-top: 200px;
}

.footer-container {
display: grid;
align-content: center;
padding: 20px;
font-size: 14px;
letter-spacing: 0.07em;
color: #bbb;
text-align: center;
}

/* MEDIA QUERIES */


@media screen and (max-width: 1200px){
  #app {

  }

  .header-container {

  }

  .title-and-links {


  }

  .header h1 {
    font-size: 30px;
  }

  nav {
    grid-gap: 30px;
  }

  nav a {
    font-size: 17px;
  }

  #bar {
    width: 180px;
  }
}


@media screen and (max-width: 1000px){
  #app {

  }

  .header-container {

  }

  .title-and-links {


  }




}

@media screen and (max-width: 970px){

  .header {
    padding: 30px;
  }

  .title-and-links {
    grid-template-areas: "menu title";
    align-content: center;
    grid-gap: 20px;
  }

  .links {
    display: none;
  }

  .icon-item {
  color: #fff;
  display: grid;
  align-content: center;



  }

      .icon-nav {
    display: grid;
    grid-area: menu;
  border: none;
  color: #fff;
align-content: center;

  }

  .material-icons {
    font-size: 35px;
  }

  .menu-overlay {
      height: 100%;
      width: 0;
      position: fixed;
      z-index: 2;
      top: 0;
      left: 0;
      background-color: #333;
      overflow: hidden;
      transition: 0.3s;
      padding-top: 50px;
  }

  .menu-overlay a {
  padding: 8px 8px 8px 8px;
  display: block;
  color: #fff;
  }

  .menu-overlay .menu-closebtn {
  position: absolute;
  font-size: 40px;
  top: 5px;
  right: 8px;
  margin-left: 50px;
  cursor: pointer;
  font-weight: 300;
  }

  .menu-dropdown {
  display: none;
  background-color: #333;
  opacity: 0.9;
  width: 140px;
  margin-top: 10px;

  position: relative;
  z-index: 500;
  }

  .menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  }

  .menu li {

      margin: 0;
  }

  .menu li a {
      font-size: 18px;
      padding: 8px 8px 8px 8px;
      color:#fff;
      background-color: #333;
      font-weight: 300;
      display: block;
      letter-spacing: 0.07em;
      text-align: center;

  }

  .menu li:first-child a {
   padding-top: 8px;
  }

  .menu li:last-child a {
  padding-bottom: 8px;
  }

  .menu li a:hover {
      background-color: #999;
  }
}


@media screen and (max-width: 766px){
    #app {

    }

    .header-container {

    }

    .title-and-links {


    }

    .header h1 {
      font-size: 30px;
    }


    nav {
      grid-gap: 30px;
    }

    nav a {
      font-size: 16px;
    }

    #bar {
      width: 175px;
      font-size: 16px;
      padding: 4px 8px;
    }

  }

  @media screen and (max-width: 590px){

    .header-container {

    }

    .header h1 {
      font-size: 20px;
    }


  }




</style>
