import NavLinks from '@/layout/NavLinks.js'

export default {
  functional: true,
  render(createElement, context){

    const title = createElement('div', {
      class: 'title'
    }, [context.slots().title, context.children]);

    const links = createElement('div', {
      class: 'links' },
      [createElement(NavLinks)])

    return createElement('div', {
      class: 'title-and-links' },
    [title, links])
  }
}
