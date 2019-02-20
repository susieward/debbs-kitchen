<template>
      <div class="recipe-editor">

    <div class="recipe-form">
       <span><label for="name">Name:</label> <input  type="text" class="recipe-edit-input" v-model="recipeEdit.name" :placeholder="recipe.name"/></span>

        <span><label for="ingredients">Ingredients:</label> <input type="text" class="recipe-edit-input" v-model="newIngredient" placeholder="e.g. eggs, flour, etc"/> <button class="blackbtn" @click="addIngredient">add</button></span>

        <div class="ingredients">
        <ul class="ingr">
            <li v-for="(ingredient, index) in recipeEdit.ingredients">
                <span class="remove" @click="removeIngr(index)">x</span> {{ ingredient }}</li>
            </ul>
        </div>

        <label for="instructions">Directions:</label>


              <div class="instructions">

            <draggable :options="{draggable:'.recipe-text', animation: 200}">

              <div v-for="(box, index) in recipeEdit.instructions" class="recipe-text" :key="box">

                <div class="box-item" v-if="editId !== box.id && box.hasImage === false">{{ box.text }} <span class="box-item-buttons"><button class="box-edit" @click="editTrue(box.id)">edit</button><button class="box-edit" @click="remove(index)">x
                </button></span></div>

                <div class="box-item" v-if="editId !== box.id && box.hasImage === true"><img class="box-img" :src="box.image" /> <span class="box-item-buttons"><button class="box-edit" @click="editTrue(box.id)">edit</button><button class="box-edit" @click="remove(index)">x
                </button></span></div>

                <div class="box-edit-item" v-if="editing === true && editId === box.id">
                  <textarea name="instructions" class="recipe-textarea" v-model="editText">{{ box.text }}</textarea><br />
                  <span><button @click="editBox(box.id)" class="box-edit">save changes</button> <button class="box-edit" @click="cancel">cancel</button></span>

                </div><br />

              </div>
          </draggable>


        <div v-if="editing === false">

        <div class="new-box">

          <div class="new-box-text-cover" @click="showText" v-if="itemChosen === false">
            <p>
              add text
            </p>
            </div>

          <div class="new-box-text" v-if="text === true && itemChosen === true">


                <textarea class="box-textarea" v-model="newBox.text" placeholder="Add text"></textarea>
                <button class="box-edit" @click="addText">add text</button>
                <button class="box-edit" v-if="itemChosen === true" @click="backToSelection">back
                </button>
                <p style="color: red">{{ textError }}</p>
        </div>

        <div v-if="itemChosen === true && image === false">

              </div>


          <div class="new-box-img-cover" @click="showImage" v-if="itemChosen === false">
            <p>
              add image
            </p>
          </div>

              <div class="new-box-img" v-if="itemChosen === true && text === false">
                <div v-if="!newBox.image">
                  <p style="font-weight: 400">
                    Choose an image:
                  </p>
                  <input type="file" @change="onFileChange">
                </div>

                <div v-else>


                <img class="box-img" v-bind:src="newBox.image"/>

                <button @click="removeImage">Remove image</button>
        </div>
            </div>
          </div>

        <div v-if="itemChosen === true && text === false">
                <button class="box-edit" @click="addImage">add image</button> <button class="box-edit" v-if="itemChosen === true" @click="backToSelection">back
                </button>
                <p>
                  <span style="color: red">{{ imgError }}</span>
                </p>

                </div>



        </div>
            </div>

      <span><label for="tags">Tags:</label> <input type="text" id="tag" class="recipe-edit-input" v-model="newTag" placeholder="e.g. dinner, holiday, etc"/> <button class="blackbtn" @click="addTag">add tag</button></span>

        <p>
        <ul class="tag-ul">
            <li v-for="(tag, index) in recipeEdit.tags">
                <span class="remove" @click="removeTag(index)">x</span> <span class="tag-text">{{ tag }}</span></li>
            </ul>
        </p>

      <button class="pinkbtn" @click="editRecipe(recipe)">save changes</button>

    </div>

    </div>
</template>
<script>
import draggable from 'vuedraggable'
import axios from 'axios'
export default {
data(){
    return {
        recipeEdit: {
            name: '',
            instructions: [],
           ingredients: [],
            tags: []
        },
        newIngredient: '',
        newTag: '',
        newBox: {
          text: '',
          id: '',
          image: '',
          hasImage: false
        },
        imgError: '',
        textError: '',
        text: false,
        image: false,
        itemChosen: false,
        editing: false,
        editText: ''
    }
},

components: {
    draggable
},

    props: ['recipe'],
    name: 'RecipeEditor',

    created(){
    this.recipeEdit = Object.assign({}, this.recipe);
},

    methods: {


        backToSelection: function(){

          this.itemChosen = false;
          this.text = false;
          this.image = false;
          this.imgError = '';
          this.textError = '';

        },

        showText: function(){
          this.text = true;
          this.itemChosen = true;
        },

        showImage: function(){
          this.image = true;
          this.itemChosen = true;
        },

        onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;
             if (!files.length)
            return;
          this.createImage(files[0]);
        },

        createImage(file) {
          var image = new Image();
          var reader = new FileReader();
          var vm = this;

          reader.onload = (e) => {
            vm.image = e.target.result;
              this.newBox.image = vm.image;
          };
          reader.readAsDataURL(file);
        },

        removeImage: function (e) {
          this.newBox.image = '';
        },

        onInput: function(value, index){
          this.newText.text = value;
          this.newText.order = index;

          this.contentArray.push(this.newtext);
          this.newText = {}


        },

          addText: function(){

      if(this.newBox.text){
            var number = Date.now() + Math.random().toString().slice(18);

        var id = 'a' + number;

              this.newBox.id = id;
              this.newBox.hasImage = false;


            this.recipeEdit.instructions.push(this.newBox);
            this.newBox = {};
            this.itemChosen = false;
            this.text = false;
          } else {

            this.textError = "Text field cannot be blank"
          }

          },

          addImage: function(){

            if(this.newBox.image){

            var number = Date.now() + Math.random().toString().slice(18);

        var id = 'a' + number;

              this.newBox.id = id;
              this.newBox.hasImage = true;


            this.recipeEdit.instructions.push(this.newBox);
            this.newBox = {};
            this.itemChosen = false;
            this.image = false;
      } else {

        this.imgError = "Please select an image"
      }

          },

          editTrue: function(id){

            this.editing = true;

            this.editId = id;


          },

          editBox: function(id){



        var boxId = id;

            var index = this.recipeEdit.instructions.findIndex(b => b.id === boxId);

            var updatedBox = {
              text: this.editText,
              id: boxId
            }

            this.recipeEdit.instructions.splice(index, 1, updatedBox);
            this.editing = false;
            this.editId = ''
            this.editText = ''



          },

          cancel: function(){
            this.editing = false;
            this.editId = '';
            this.editText = '';
          },



          remove: function(index){

            this.recipeEdit.instructions.splice(index, 1);

          },

         addIngredient: function(){

            this.recipeEdit.ingredients.push(this.newIngredient);
            this.newIngredient = '';
        },

        removeIngr: function(index){
            var ingredients = this.recipeEdit.ingredients;

            ingredients.splice(index, 1);
        },

    addTag: function(){

            this.recipeEdit.tags.push(this.newTag);
            this.newTag = '';
        },

    removeTag: function(index){
            var tags = this.recipeEdit.tags;

            tags.splice(index, 1);
        },


    editRecipe: function(recipe){

        let path = 'http://localhost:3000/recipes/' +recipe._id;

        let data = {
            _id: this.recipe._id,
            name: this.recipeEdit.name,
            ingredients: this.recipeEdit.ingredients,
            instructions: this.recipeEdit.instructions,
            tags: this.recipeEdit.tags

            };

        axios.put(path, data).then((response) => {
            this.$store.commit('editRecipe', {recipe: response.data});

        });
        this.$emit('close');

        }
    }
}

</script>
<style>

    .recipe-form {
display: grid;
grid-gap: 20px;
padding: 25px;
align-content: flex-start;
min-height: 500px;
}


.recipe-edit-input{
    width: 200px;
    border: 1px solid #777;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 18px;
    font-family: 'Roboto';
    font-weight: 300;
    margin-left: 10px;
    margin-right: 5px;
    }




.recipebtn {
border: none;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #ddd;
    padding: 6px 10px;
    font-size: 16px;
    color: #444;
    cursor: pointer;
   max-width: 150px;
    }

    label {
    }

    .ingredients {
    display: grid;

    }

    .ingr {
    list-style-type: none;
    margin: 0;
    padding: 0;

    }

    .ingr li {
  margin-left: 50px;
    color: #555;
    }

      .tags-container {
    display: grid;
    border: 1px solid #333;
    justify-content: flex-start;

    }

    .tags-list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    }

   .tags-list li {




    }




    .recipe-textarea {
    font-size: 16px;
    padding: 10px 12px;
    width: 650px;
    min-height: 150px;
    border: 1px solid #777;
    border-radius: 8px;
    resize: none;

    }



    .box-img {
      width: 300px;
    }

    .new-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    margin-bottom: 10px;
    }

    .new-box-text-cover {
    display: grid;
    background-color: #ddd;
    border: 1px solid #ddd;
    border-radius: 6px;
    width: auto;
    height: 200px;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    transition: 0.2s;
    }

    .new-box-text-cover:hover {
      background-color: #848484;
      border: 1px solid #848484;
      color: #fff;
    }

    .new-box-img-cover {
      display: grid;
      background-color: #ddd;
      border: 1px solid #ddd;
      border-radius: 6px;
      width: auto;
      height: 200px;
      justify-content: center;
      align-content: center;
      cursor: pointer;
      transition: 0.2s;
    }

    .new-box-img-cover:hover {
      background-color: #848484;
      border: 1px solid #848484;
      color: #fff;
    }

    .box-item {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto;
    background-color: #eee;
    padding: 20px;
    border: 1px solid transparent;
    border-radius: 6px;
    font-size: 16px;
    line-height: 25px;
    }

    .box-item:hover {
      cursor: pointer;
    }

    .box-item-buttons {
    display: grid;
    justify-content: flex-end;
    grid-template-columns: auto auto;
    grid-gap: 10px;
    }

    .box-edit-item {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      background-color: #eee;
      padding: 20px;
      border: 1px solid transparent;
      border-radius: 6px;

    }

    .box-remove {
    border: none;
    background-color: #eee;
      color: #000;


    padding: 4px 6px;
    font-family: 'Proxima Nova Regular';
    font-size: 14px;
    line-height: normal;
    max-height: 30px;
    cursor: pointer;
    }

    .box-edit {
      background-color: #aaa;
      border: 1px solid transparent;
      transition: 0.3s;
      border-radius: 4px;
      color: #fff;
      padding: 4px 6px;
      font-weight: 400;
      line-height: normal;
    font-family: 'Proxima Nova Regular';
    font-size: 14px;
      cursor: pointer;
      max-height: 30px;
    }

    .box-edit:hover {
      background-color: #767676;
      border: 1px solid transparent;
      color: #fff;
    }

    .remove {
        font-family: 'Proxima Nova Regular';

            color: #e50000;
            font-size: 18px;
            margin-right: 5px;
            padding: 2px;
            cursor: pointer;
        }



        .remove:hover {
        color: #000;
        }

        .tag-ul {
          list-style-type: none;
        }

        .tag-ul li {
          display: inline-block;
          margin-right: 20px;
        }

        .tag-text {

          color: #F08080;
          border-bottom: 1px solid #ddd;
          padding-bottom: 2px;
          cursor: pointer;
          font-size: 18px;
          }

      .tag-text:hover {
          color: #000;
      }

</style>
