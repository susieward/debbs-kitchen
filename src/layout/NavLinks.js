import { NavRoutes } from '@/config.js'

export default {
  functional: true,
  render(createElement, context){
    return createElement('nav', {},
      NavRoutes.map((route) => {
        return createElement('router-link', {
          attrs: { to: route.path }
        }, route.name || 'Recipes')
      })
    )
  }
}
