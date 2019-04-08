require('../src/css/main.css');
require('../src/js/main.js');

if (process.env.NODE_ENV === 'production') {
    window.endpoint = 'https://debbskitchen-server.herokuapp.com';
} else {
    window.endpoint = 'http://localhost:3000';
}
// Global Variables
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const token = localStorage.getItem('user-token')
if (token) {
  window.axios.defaults.headers.common['Authorization'] = token;
}

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store/index.js'
import moment from 'moment'
import App from './App'
import Home from './components/Home.vue'
import Recipes from './components/Recipes.vue'
import MenusList from './components/MenusList.vue'
import NewRecipe from './components/NewRecipe.vue'
import AllRecipes from './components/AllRecipes.vue'
import Recipe from './components/Recipe.vue'
import RecipePage from './components/RecipePage.vue'
import Tags from './components/Tags.vue'
import TagResults from './components/TagResults.vue'
import SearchResults from './components/SearchResults.vue'
import TaggedRecipe from './components/TaggedRecipe.vue'
import DraftsPage from './components/DraftsPage.vue'
import FullCalendar from 'vue-full-calendar'
import './registerServiceWorker'
import CKEditor from '@ckeditor/ckeditor5-vue';
import "fullcalendar/dist/fullcalendar.min.css";
import VueHtmlToPaper from 'vue-html-to-paper';
import Print from 'vue-print-nb'

Vue.use(Print);

Vue.use(FullCalendar);
Vue.use( CKEditor );

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes,
        children: [

            { path: '',
              name: 'AllRecipes',
              component: AllRecipes},

            { path: 'new',
              name: 'NewRecipe',
              component: NewRecipe },
              {
                path: 'drafts',
                name: 'DraftsPage',
                component: DraftsPage,
                props: true
              }
        ]
    },
     { path: '/recipe/:id',
      name: 'RecipePage',
      component: RecipePage,
    props: true},
    {
      path: '/menus',
      name: 'MenusList',
      component: MenusList
    },
    {
      path: '/tags',
      name: 'Tags',
      component: Tags,
    },
        {
          path: '/tags/:selectedTag',
          name: 'TagResults',
          component: TagResults,
          props: true
        },

        {
          path: '/tagged/:id',
          name: 'TaggedRecipe',
          component: TaggedRecipe,
          props: true
        },
        {
          path: '/search/:search',
          name: 'SearchResults',
          component: SearchResults,
          props: true
        }

  ]

const router = new VueRouter({
mode: 'history',
routes,
scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
    }
});

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
    store,
     created() {
        this.$store.dispatch('loadMenus');
         this.$store.dispatch('loadRecipes');
         this.$store.dispatch('loadDrafts');

    },
  render: h => h(App)
}).$mount('#app')
