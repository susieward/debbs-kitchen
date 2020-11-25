<template>
<div class="home">
    <div class="home-content">
    <menu-planner></menu-planner>
    </div>
</div>

</template>
<script>

export default {

name: 'Home',

components: {
    MenuPlanner: () => import('@/components/MenuPlanner.vue')
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
