<template>
  <div ref="sideNav" class="bm-menu">
      <span class="bm-cross-button cross-style" @click="closeMenu">
             <span v-for="(x, index) in 2" :key="x" class="bm-cross" :style="{ position: 'absolute', width: '3px', height: '14px',transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)'}">
             </span>
         </span>
      <div class="menu-overlay-extended">
          <ul class="menu">
              <li><router-link to="/">planner</router-link></li>
              <li><router-link to="/recipes">recipes</router-link></li>
              <li><router-link to="/menus">menus</router-link></li>
              <li><router-link to="/tags">index</router-link></li>
              <li style="display: none"><router-link to="to" @click.native="logout">logout</router-link></li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidenav'
}
</script>
