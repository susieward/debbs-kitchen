<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-content">
        <div class="modal-title">
          <h2 class="menu-date">Menu for {{ month + ' ' + thisDate }}</h2>
          <span class="close">
            <span class="close-button" @click="$emit('close')">&times;</span>
          </span>
        </div>
        <div class="modal-container">
          <div class="modal-items">
            <div v-for="(menu, index) in createdMenus"
              class="menus"
              v-if="showEditor == false">
              <div class="menu-list-container">
                <ul class="menu-list">
                  <li v-for="dish in menu.dishes" @click="linkRecipe(dish)">
                    {{ dish.name }}
                  </li>
                </ul>
              </div>
              <div class="menu-buttons-container">
                <span>
                  <button class="greybtn" @click="openEditor(menu)" v-if="showEditor == false">
                    edit menu
                  </button>
                  <button class="blackbtn" @click="deleteMenu(menu._id)">
                    delete menu
                  </button>
                </span>
              </div>
            </div>
            <MenuEditor
              v-if="showEditor == true"
              :menu="selectedMenu"
              :date="thisDate"
              :month="month"
              :year="year"
              @close="closeEditor">
            </MenuEditor>
          <!--  <div v-if="newMenuContainer == true">
              <div v-for="(dish, index) in dishes" class="dishes">
                <ul class="menu-list">
                  <li><span class="remove" @click="removeDish(index)">x</span> {{ dish.name }}</li>
                </ul>
              </div>
              <div class="inputs">
                <input type="text" class="dish-item" v-model="newDish" placeholder="Start typing recipe name" />
                <div v-if="newDish">
                  <div class="results-dropdown" v-if="dishResults.length">
                    <ul class="dishes-select">
                      <li v-for="result in dishResults" @click="addToDishes(result)">{{ result.name }}</li>
                    </ul>
                  </div>
                </div>
                <p v-if="disabled === true" style="color: red;">
                  Can't add dish if input is empty
                </p>
              </div>
              <button class="pinkbtn" v-if="dishes.length" @click="createMenu">
                save new menu
              </button>
            </div> -->
          </div>
          <span>
            <div v-if="createdMenus.length === 0">
              <span>
                <button v-if="newMenuContainer == false" class="pinkbtn" @click="addNewMenu">
                  add new menu
                </button>
                <button v-if="newMenuContainer == true" class="greybtn" @click="closeNewMenu">
                  nevermind
                </button>
              </span>
            </div>
          </span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import menusMixin from "@/mixins/menusMixin.js";
import MenuEditor from "./MenuEditor.vue";
export default {
  mixins: [menusMixin],
  data() {
    return {
      dishes: [],
      newDish: "",
      showEditor: false,
      newMenuContainer: false,
      selectedMenu: undefined,
      search: "",
      results: [],
      isOpen: false,
      inputErr: "",
      disabled: false,
    };
  },
  name: "modal",
  components: {
    MenuEditor,
  },
  props: ["thisDate", "month", "year"],
  methods: {
    linkRecipe(dish) {
      let dishId = dish._id;
      this.$router.push({ name: "RecipePage", params: { id: dishId } });
    },
    onChange() {
      this.isOpen = true;
      this.filterResults();
    },
    filterResults() {
      this.results = this.recipeNames.filter((recipe) => recipe.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },
    checkInput() {
      if (this.newDish === "") {
        this.disabled = true;
      } else {
        this.disabled = false;
        this.addDish();
      }
    },
    addToDishes(result) {
      this.dishes.push(result);
      this.newDish = "";
    },
    addDish() {
      this.dishes.push(this.newDish);
      this.newDish = "";
    },
    removeDish(index) {
      let dishes = this.dishes;
      dishes.splice(index, 1);
    },
    openEditor(menu) {
      this.selectedMenu = menu;
      this.showEditor = true;
    },
    closeEditor() {
      this.showEditor = false;
      this.loadMenus();
    },
    addNewMenu() {
     this.newMenuContainer = true;
      this.showEditor = true
    },
    closeNewMenu() {
      if ((this.disabled = true)) {
        this.disabled = false;
      }
      this.newMenuContainer = false;
    },
  },
};
</script>
<style>
.menu-editor {
  margin-top: 20px;
}

.menus {
  display: grid;

  grid-template-columns: auto auto;
}

.menu-list-container {
  display: grid;
  padding-left: 10px;
  justify-content: flex-start;
}

.menu-buttons-container {
  display: grid;
  justify-content: flex-end;
}

.inputs {
  margin-bottom: 20px;
  margin-top: 20px;
}

.close {
  display: grid;
  justify-content: flex-end;
}

.close-button {
  font-size: 40px;
  cursor: pointer;
}

.close-button:hover {
  color: #eee;
}

.dishes {
  display: grid;
  grid-gap: 0;
}

.menu-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu-list li {
  color: #f08080;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.menu-list li:hover {
  color: #000;
}

.modal-title {
  display: grid;
  grid-template-columns: auto auto;
}
.menu-date {
  font-size: 25px;
  font-weight: 300;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-content {
  display: grid;
  position: relative;
  align-content: flex-start;
  background-color: #fefefe;
  padding: 20px;
  width: 830px;
  min-width: auto;
  min-height: 400px;
  overflow: scroll;
  max-height: 550px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.modal-container {
  display: grid;
  grid-gap: 20px;
  padding: 0px;
}

.modal-items {
  display: grid;
  background-color: #f9f9f9;
  padding: 20px;
  grid-gap: 0;
  min-height: 250px;
  align-items: flex-start;
}

.dish-item {
  width: 220px;
  border: 1px solid #777;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 16px;
}

.editbtn {
  border: none;
  border: 1px solid #000;
  border-radius: 6px;
  background-color: #000;
  padding: 6px 10px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  max-width: 150px;
}

.closebtn {
  border: none;
  border: 1px solid #000;
  border-radius: 6px;
  background-color: #000;
  padding: 6px 10px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  max-width: 150px;
}

.generalbtn {
  border: none;
  border: 1px solid #f56c7c;
  border-radius: 6px;
  background-color: #f56c7c;
  padding: 6px 10px;
  font-size: 16px;
  color: #fff;
  font-family: "Work Sans";
  font-weight: 400;
  cursor: pointer;
}

.generalbtn:hover {
  background-color: rgba(245, 108, 124, 0.6);
  border: 1px solid rgba(245, 108, 124, 0.6);
}

.btns {
  display: grid;
  justify-content: center;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  margin: auto;
  padding: 20px;
  border: 1px solid #eee;
}

.material-icons {
  cursor: pointer;
}

.modal-buttons {
  display: grid;
  align-items: flex-end;
  border: 1px solid #ddd;
}

.results-dropdown {
  width: 300px;
  background-color: #ddd;
  min-height: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.dishes-select {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.dishes-select li {
  display: block;
  background-color: #ddd;
  color: #444;
  cursor: pointer;
  letter-spacing: normal;
  padding: 4px 6px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.dishes-select li:hover {
  background-color: #aaa;
  color: #fff;
  border-left: 1px solid #aaa;
  border-right: 1px solid #aaa;
}

@media screen and (max-width: 1200px) {
  .modal-content {
    width: 700px;
  }
}

@media screen and (max-width: 1000px) {
  .modal-content {
    width: 700px;
  }
}

@media screen and (max-width: 970px) {
  .modal-content {
    width: 680px;
  }

  .results-dropdown {
    width: 250px;
  }
}

@media screen and (max-width: 766px) {
  .modal-content {
    width: 500px;
  }

  .menu-date {
    font-size: 22px;
  }
}

@media screen and (max-width: 590px) {
  .modal-content {
    width: 400px;
  }

  .results-dropdown {
    width: 200px;
  }
}

@media screen and (max-width: 400px) {
  .modal-content {
    width: 380px;
  }
}
</style>
