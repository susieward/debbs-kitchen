<template>
  <div id="app">

    <div class="login-page" v-if="!isAuthenticated">
      <login></login>
  </div>


    <div class="app-container" v-if="isAuthenticated">

      <Slide width="200">
        <div class="menu-overlay-extended">

                <ul class="menu">
                    <li><router-link to="/">planner</router-link></li>
                    <li><router-link to="/recipes">recipes</router-link></li>
                    <li><router-link to="/menus">menus</router-link></li>
                    <li><router-link to="/tags">index</router-link></li>


                    </ul>
                </div>
                </Slide>

      <div class="header">

         <div class="header-container">


           <div class="title-and-links">

             <div class="icon-nav">
             <span class="icon-item">
</span>



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
            <button @click="logout()">logout</button>

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
          website by <a href="https://susieward.dev">Susie Ward</a>
        </p>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
import Login from './components/Login.vue'
export default {
  data(){
    return {
      prevRoute: null,
      name: '',
      search: '',
      loggedIn: false,
      isActive: false
    }
  },
  name: 'App',

  components: {
    Login,
    Slide
  },

  computed: {

    isAuthenticated(){
        return this.$store.getters.isAuthenticated;
    },

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

    toggleClass: function(event){
       if(!this.isActive){
         this.isActive = true;
       }else{
         this.isActive = false;
       }

    },

    loginSuccess: function(){

      this.loggedIn = true;
    },

    logout: function(){
        this.$store.commit('AUTH_LOGOUT');
        this.$router.push('/')
    },

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
background-color: #fff;
min-height: 100vh;
z-index: 1;
position: relative;
}


.material-icons {
font-size: 35px;
}

.bm-burger-button {
     position: absolute;
     width: 28px;
     height: 25px;
     left: 32px;
     top: 46px;
     cursor: pointer;
     display: none;

   }
   .bm-burger-bars {
     background-color: #fff;
   }
   .line-style {
     position: absolute;
     height: 14%;
     left: 0;
     right: 0;
   }
   .cross-style {
     position: absolute;
     top: 12px;
     right: 2px;
     cursor: pointer;
   }
   .bm-cross {
     background: #bdc3c7;
   }
   .bm-cross-button {
     height: 24px;
     width: 24px;
   }
   .bm-menu {
     height: 100%; /* 100% Full-height */
     width: 0; /* 0 width - change this with JavaScript */
     position: fixed; /* Stay in place */
     z-index: 1000; /* Stay on top */
     top: 0;
     left: 0;
     background-color: #333; /* Black*/
     overflow-x: hidden; /* Disable horizontal scroll */
padding-top: 0;
display: grid;
justify-content: center;
align-items: center;
align-content: flex-start;
     transition: 0.4s; /*0.5 second transition effect to slide in the sidenav*/
   }

   .bm-overlay {

   }
   .bm-item-list {
     color: #b8b7ad;

     font-size: 20px;
   }
   .bm-item-list > * {
     display: flex;
     text-decoration: none;
     padding: 0.7em;
   }
   .bm-item-list > * > span {

     font-weight: 700;
     color: white;
   }


     .menu {
     list-style-type: none;
     padding: 0;
     margin: 0;
     }

     .menu li {
       width: 310px;
         margin: 0;
     }

     .menu li a {
         font-size: 18px;
         padding: 10px 8px 10px 8px;
         color: #fff;
         font-family: 'Roboto';
         text-transform: lowercase;
         font-weight: 300;
         display: block;
         letter-spacing: 0.09em;
         text-align: center;

     }

     .menu li a.router-link-exact-active {
       color: #fff;
     }

     .menu li:first-child a {
      padding-top: 10px;
     }

     .menu li:last-child a {
     padding-bottom: 10px;
     }

     .menu li a:hover {
         background-color: #999;
         color: #fff;
     }


.menu-overlay {
  height: 100vh;
background-color: #333;
overflow: hidden;
transition: 0.3s;

}

.menu-overlay-extended a {

}

.menu-overlay-extended {
width: 310px;

margin-top: 45px;
margin-left: 38px;
background-color: #333;
display: grid;
justify-content: center;
transition: 0.3s;

padding: 0;
}

.menu-closebtn {
position: absolute;
font-size: 40px;
top: 5px;
right: 8px;
margin-left: 50px;
cursor: pointer;
font-weight: 300;
}




.login-page {
  display: grid;
  justify-content: center;
  align-content: center;
}

.logout-btn {
  background-color: #848484;
  border: 1px solid #848484;
  color: #fff;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Roboto';
  font-weight: 300;
   transition: 0.2s;
   letter-spacing: 0.03em;

}

.app-container {

  display: grid;
  grid-template-areas: "header header"
                      "main main"
                      "footer footer";
  min-height: 100vh;
  z-index: 0;
  position: relative;
}

.drafts-link {
  margin-left: 30px;
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
grid-template-columns: auto auto auto auto auto;
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
  width: 38px;




  }

  .icon-nav {
  display: grid;
  grid-area: menu;
  border: none;
  color: #fff;
  align-content: center;

  }

.bm-burger-button {
  display: block;
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
      width: 160px;
      font-size: 16px;
      padding: 4px 6px;
    }

  }

  @media screen and (max-width: 590px){

    .header-container {

    }

    .header h1 {
      font-size: 20px;
    }

    .icon-item {
        width: 32px;
    }


  }

@media print {

  .header {
    display: none;
  }

  .main {
    margin-top: 30px;
  }

.footer {
  display: none;
}

}


</style>
