import router from '@/router.js'

const NavRoutes = router.options.routes.filter(route => route.props.navDisplay === true);
const SideRoutes = router.options.routes.filter(route => route.props.sidenav === true);

const config = {
  navRoutes: NavRoutes,
  sideRoutes: SideRoutes,
  fixedNav: false
}

export { NavRoutes, SideRoutes, config }
