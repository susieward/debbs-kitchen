<template>
<div class="menus-list">
    <div class="menus-list-title">
<h1>Menu Archive</h1>
        </div>
 <div class="menus-list-container">
   <p>
     <span>
     <span>Select year: <select v-model="selectedYear">
        <option disabled value="">select</option>
      <option v-for="year in years" v-bind:value="year"> {{ year }}
         </option>
          </select>
     </span>
     <span v-if="selectedYear"> Select month: <select v-model="selectedMonth">
        <option disabled value="">select</option>
      <option v-for="month in availableMonths" v-bind:value="month"> {{ month }}
         </option>
          </select>
     </span>
   </span>
   </p>
       <div v-for="menu in chronologicalMenus">
    <div v-if="selectedMonth === menu.month && selectedYear === menu.year">

      {{ menu.month }} {{ menu.date }} -
     <ul>
     <li v-for="dish in menu.dishes"> <router-link :to="{ name: 'RecipePage', params: { id: dish._id }}">{{ dish.name }}</router-link></li>
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
      today: moment(),
      dateContext: moment(),
        selectedMonth: '',
        selectedYear: '',
        allMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
},
    computed: {
        menus(){
            return this.$store.state.menus;
        },

        chronologicalMenus: function(){
          var menuDates = this.menus.map(menu => menu.date);
          var sortedDates = menuDates.sort();
          function compare(a, b) {
            return a.date - b.date;
          }
        return this.menus.sort(compare);
        },

        months(){

          var menuMonths = this.menus.map(menu => menu.month);

          var uniqueMonths = [...new Set(menuMonths)];


          return uniqueMonths;
        },

        availableMonths(){

          if(this.selectedYear){

            var selectedYearMenus = this.menus.filter(menu => menu.year === this.selectedYear);

            var months = selectedYearMenus.map(menu => menu.month);

            var unique = [... new Set(months)];

          return unique;
          }
        },

        years(){

          var menuYears = this.menus.map(menu => menu.year);

          var uniqueYears = [...new Set(menuYears)];


          return uniqueYears;
        },

        year: function() {
            var t = this;
            return t.dateContext.format('Y');
        },

      month(){
        let t = this;
        return t.dateContext.format('MMMM');
      }
    },

  methods: {
      onChange(event){
        var year = event.target.value;
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
width: 900px;
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


    @media screen and (max-width: 1200px){

      .menus-list {
      width: 850px;
      padding: 30px;
      }


    }

    @media screen and (max-width: 1000px){

      .menus-list {
      width: 800px;
      padding: 30px;
      }


    }

    @media screen and (max-width: 970px){

      .menus-list {
      width: 700px;
      padding: 30px;
      }

      .menus-list h1 {
        font-size: 30px;
      }


    }

    @media screen and (max-width: 766px){

    .menus-list {
      width: 550px;
      padding: 20px;
      }

      .menus-list h1 {
        font-size: 28px;
      }


    }

    @media screen and (max-width: 590px){

      .menus-list {
      width: 420px;

      }

      .menus-list h1 {
        font-size: 28px;
      }


    }

    @media screen and (max-width: 400px){

      .menus-list {
      width: 350px;
      padding-left: 5px;
      padding-right: 5px;
      }

      .menus-list h1 {
        font-size: 25px;
      }


    }

</style>
