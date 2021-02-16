import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/Home.vue')
const Recipes = () => import('@/views/Recipes.vue')
const RecipePage = () => import('@/views/RecipePage.vue')
const AllRecipes = () => import('@/components/recipes/AllRecipes.vue')
const NewRecipe = () => import('@/components/recipes/NewRecipe.vue')
const MenusList = () => import('@/views/MenusList.vue')
const Tags = () => import('@/views/Tags.vue')
const TagResults = () => import('@/views/TagResults.vue')
const TaggedRecipe = () => import('@/views/TaggedRecipe.vue')
const DraftsPage = () => import('@/views/DraftsPage.vue')
const SearchResults = () => import('@/views/SearchResults.vue')

Vue.use(Router)

const routes = [
    {
      path: '/',
      name: 'planner',
      component: Home,
      props: { navDisplay: true }
    },
    {
      path: '/recipes',
      component: Recipes,
      props: { navDisplay: true, sidenav: true },
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
      name: 'Menus',
      component: MenusList,
      props: { navDisplay: true, sidenav: true }
    },
    {
      path: '/tags',
      name: 'Index',
      component: Tags,
      props: { navDisplay: true, sidenav: true }
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

  const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
      }
  });

  export default router;
