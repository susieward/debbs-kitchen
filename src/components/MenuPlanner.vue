<template>
<div class="menu-planner">

<div class="page-title">

  <button class="monthbtn" @click="subtractMonth">&#x27F5;</button> <h1>{{month + ' - ' + year}}</h1> <button class="monthbtn" @click="addMonth">&#x27F6;</button>
    </div>

    <div class="month">
    <div class="weekdays">

        <div class="day-title" v-for="day in days">{{ day }}</div>
         </div>

    <div class="week">
        <div class="day" v-for="blank in firstDayOfMonth">&nbsp;</div>

        <div class="day" v-for="thisDate in daysInMonth" @click="openModal(thisDate, month, year)">
            {{ thisDate }}

           <div v-for="menu in menus">

               <div v-if="thisDate === menu.date && month === menu.month">
                 <span class="menu-dot">&#11044;</span>
                   <div class="menu-text">

                   <ul class="menu-list-calendar">
                   <li v-for="dish in menu.dishes">{{ dish.name }}</li>
                   </ul>
                   </div>
               </div>
            </div>






        </div>

       <modal v-if="showModal" @close="closeModal" :this-date="thisDate" :month="month" :year="year"></modal>

     </div>
        </div>




    </div>
</template>
<script>
import modal from './modal.vue'
import moment from 'moment'
export default {

components: {
    modal
},

data() {
    return {
        today: moment(),
        dateContext: moment(),
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
          months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        showModal: false,
         thisDate: this.thisDate,
        showMenu: false

    }
},

    computed: {

        menus(){

            return this.$store.state.menus
        },

        year: function() {
            var t = this;
            return t.dateContext.format('Y');

        },

        month: function(){
            var t = this;
            return t.dateContext.format('MMMM');

        },

        daysInMonth: function () {
            var t = this;
            return t.dateContext.daysInMonth();

        },

        currentDate: function () {
            var t = this;
            return t.dateContext.get('date');

    },

        firstDayOfMonth: function () {
            var t = this;
            var firstDay = moment(t.dateContext).subtract((t.currentDate - 1), 'days');
        return firstDay.weekday();

    },

        initialDate: function(){
            var t = this;
            return t.today.get('date');
        },

         initialMonth: function () {
        var t = this;
        return t.today.format('MMMM');
    },
    initialYear: function () {
        var t = this;
        return t.today.format('Y');
    }
    },


    methods: {

        menuToggle: function(){
            this.showMenu === true;
        },

        addMonth: function () {
        var t = this;
        t.dateContext = moment(t.dateContext).add(1, 'month');
    },
    subtractMonth: function () {
        var t = this;
        t.dateContext = moment(t.dateContext).subtract(1, 'month');
    },

    openModal: function(thisDate, month, year){
           this.thisDate = thisDate;
            this.month = month;
            this.year = year;
           this.showModal = true;
       },

      closeModal() {
            this.showModal = false;
           this.$store.dispatch('loadMenus');

        }
    },






name: 'MenuPlanner'
}
</script>
<style>

.menu-planner {
display: grid;
background-color:#f9f9f9;

padding: 20px 30px 30px 30px;
align-items: center;
align-content: flex-start;
width: auto;
}

.menu-planner h1 {
text-align: center;
margin: 0px;
padding: 0;
font-weight: 300;
font-size: 34px;
line-height: 45px;
}

.page-title {
display: grid;
grid-template-columns: 100px auto 100px;
grid-gap: 20px;
padding: 20px;
margin-bottom: 20px;
}

    .monthbtn {
    border: none;
    font-size: 30px;
    cursor: pointer;
    background-color: #f9f9f9;
    color: #F08080;
    border: none;
    }

.month {
display: grid;
width: auto;
height: auto;
border-top: 1px solid #444;
border-left: 1px solid #444;

grid-template-rows: repeat(5, auto);
}

.weekdays {
display: grid;
grid-template-columns: repeat(7, auto);
height: auto;
}

.week {
display: grid;
width: auto;
grid-template-columns: repeat(7, auto);
}

.day-container {
display: grid;
grid-gap: 0px;
}

.day {
width: 150px;
height: 150px;
padding: 10px;
opacity: 1;
border-right: 1px solid #444;
border-bottom:  1px solid #444;
}

.day:hover {
cursor: pointer;
background-color: #F08080;
color: #fff;
}

    .day:hover .menu-list li {
        color: #fff;
    }

    .day:hover .menu-dot {
      color: #fff;
    }

    .day-overlay {

    }


.day:nth-child(even){
background-color: #F8F4F4;
}

.day:nth-child(even):hover {
background-color: #F08080;
}

.day:nth-child(odd){
background-color: #fff;
}

.day:nth-child(odd):hover {
background-color: #F08080;
}

.day-alt {
width: 150px;
height: 150px;
padding: 10px;
background-color: #F8F4F4;
    border-right: 1px solid #444;
}

.day-title {
font-size: 18px;
margin: 0;
padding: 0;
width: 150px;
border-right: 1px solid #444;
text-align: center;
border-bottom: 1px solid #444;

}

    .menu-click {
    font-family: 'Proxima Nova Regular';
    cursor: pointer;
    color: #F08080;

    }

      .menu-list-calendar {
    list-style-type: none;
    margin: 0;
    padding: 0;
    }

    .menu-list-calendar li {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: normal;
    letter-spacing: normal;
    }


    .menu-text {
      display: block;
    }

    .menu-dot {
      display: none;
      color: #F08080;
      padding: 0;
      font-size: 14px;
      line-height: normal;
      margin-left: 3px;

    }


@media screen and (max-width: 1200px){

  .menu-planner {
  display: grid;
  background-color:#f9f9f9;
  padding: 20px 40px 20px 40px;
  align-items: center;
  align-content: flex-start;
  width: auto;
  }

  .menu-planner h1 {
  text-align: center;
  margin: 0px;
  padding: 0;
  font-weight: 300;
  font-size: 34px;
  line-height: 45px;
  }

  .day {
  width: 100px;
  height: 100px;
  padding: 5px;
  opacity: 1;
  border-right: 1px solid #444;
  border-bottom:  1px solid #444;
  }

  .day-alt {
  width: 100px;
  height: 100px;
  padding: 5px;
  background-color: #F8F4F4;
      border-right: 1px solid #444;
  }

  .weekdays {
  display: grid;
  grid-template-columns: repeat(7, auto);
  height: auto;

  }

  .day-title {
    width: 100px;
    font-size: 16px;
  }

}


@media screen and (max-width: 1000px){




}

@media screen and (max-width: 970px){

  .menu-planner {
    padding: 20px 30px 20px 30px;
  }



  .menu-planner h1 {
    font-size: 30px;
    line-height: 45px;
  }

  .monthbtn {
    font-size: 20px;
  }


  .page-title {
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-gap: 20px;
  padding: 10px;
  margin-bottom: 20px;
  }

  .day {
  width: 90px;
  height: 90px;
  padding: 2px;
  opacity: 1;
  border-right: 1px solid #444;
  border-bottom:  1px solid #444;
  font-size: 12px;
  }

  .day-alt {
  width: 90px;
  height: 90px;
  padding: 2px;
  background-color: #F8F4F4;
      border-right: 1px solid #444;
  }

  .weekdays {
  display: grid;
  grid-template-columns: repeat(7, auto);
  height: auto;

  }

  .day-title {
    width: 90px;
    font-size: 16px;
  }

}



@media screen and (max-width: 766px){

  .menu-planner {
    padding: 20px 20px 20px 20px;
  }



  .menu-planner h1 {
    font-size: 25px;
    line-height: 35px;
  }

  .monthbtn {
    font-size: 20px;
  }


  .page-title {
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-gap: 20px;
  padding: 10px;
  margin-bottom: 20px;
  }

  .day {
  width: 75px;
  height: 75px;
  padding: 2px;
  opacity: 1;
  border-right: 1px solid #444;
  border-bottom:  1px solid #444;
  font-size: 14px;
  }

  .day-alt {
  width: 75px;
  height: 75px;
  padding: 2px;
  background-color: #F8F4F4;
      border-right: 1px solid #444;
  }

  .weekdays {
  display: grid;
  grid-template-columns: repeat(7, auto);
  height: auto;

  }

  .day-title {
    width: 75px;
    font-size: 16px;
  }

  .menu-text {
    display: none;
  }

  .menu-dot {
    display: block;
  }

}

@media screen and (max-width: 590px){

  .menu-planner {
    padding: 20px 10px 20px 10px;
  }



  .menu-planner h1 {
    font-size: 20px;
    line-height: 25px;
  }

  .monthbtn {
    font-size: 20px;
  }


  .page-title {
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-gap: 20px;
  padding: 10px;
  margin-bottom: 10px;
  }

  .day {
  width: 55px;
  height: 55px;
  padding: 2px;
  opacity: 1;
  border-right: 1px solid #444;
  border-bottom:  1px solid #444;
  font-size: 12px;
  }

  .day-alt {
  width: 55px;
  height: 55px;
  padding: 2px;
  background-color: #F8F4F4;
      border-right: 1px solid #444;
  }

  .weekdays {
  display: grid;
  grid-template-columns: repeat(7, auto);
  height: auto;

  }

  .day-title {
    width: 55px;
    font-size: 12px;
  }

}

@media screen and (max-width: 400px){

  .menu-planner {
    padding: 20px 10px 20px 10px;
  }



  .menu-planner h1 {
    font-size: 20px;
    line-height: 25px;
  }

  .monthbtn {
    font-size: 20px;
  }


  .page-title {
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-gap: 20px;
  padding: 10px;
  margin-bottom: 10px;
  }

  .day {
  width: 50px;
  height: 50px;
  padding: 1px;
  opacity: 1;
  border-right: 1px solid #444;
  border-bottom:  1px solid #444;
  font-size: 12px;
  }

  .day-alt {
  width: 50px;
  height: 50px;
  padding: 1px;
  background-color: #F8F4F4;
      border-right: 1px solid #444;
  }

  .weekdays {
  display: grid;
  grid-template-columns: repeat(7, auto);
  height: auto;

  }

  .day-title {
    width: 50px;
    font-size: 12px;
  }

  .menu-dot {
    font-size: 12px;

  }

}



</style>
