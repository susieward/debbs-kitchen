<template>
<div class="home">
    <div class="home-content">

    <menu-planner></menu-planner>


    </div>

</div>

</template>
<script>

import MenuPlanner from './MenuPlanner.vue'
export default {

name: 'Home',

components: {
    MenuPlanner
            }
}
</script>
<style>

.home-content {
display: grid;
min-height: 500px;
background-color: #f9f9f9;



}



</style>
