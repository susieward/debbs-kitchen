<template>
<div class="menus-list">
    <div class="menus-list-title">
<h1>Menus List</h1>
        </div>
 <div class="menus-list-container">
     <span>Sort by month: <select v-model="selectedMonth">
        <option disabled value="">select</option>
      <option v-for="month in months" v-bind:value="month"> {{ month }}
         </option>
          </select>
     </span>

       <div v-for="menu in menus">
    <div v-if="selectedMonth === menu.month">

      {{ menu.month }} {{ menu.date }} -
     <ul>
     <li v-for="dish in menu.dishes"> {{ dish.name }}</li>
     </ul>

    </div>
    </div>

</div>
</div>

</template>
<script>

import moment from 'moment'
export default {
data() {
    return {
        selectedMonth: '',
       months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
},
    computed: {
        menus(){
            return this.$store.state.menus;
        }
    },

name: 'MenusList'
}
</script>
<style>


.menus-list {
display: grid;
background-color:#f9f9f9;
min-height: 800px;
align-content: flex-start;
padding: 30px;
}

    .menus-list-title {
    width: 100%;
    text-align: center;
    padding: 20px;
    }

.menus-list h1 {
padding-top: 0;
margin-top: 0;
font-weight: 300;
font-size: 34px;
text-align: center;

}

    .menus-list-container {
    display: grid;
    padding: 30px;

    }

</style>
