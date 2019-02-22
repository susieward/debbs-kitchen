<template>
<div class="new-recipe">
  <div class="recipe-form">


       <span><label for="name">Name:</label> <input id="name" type="text" class="recipe-input" v-model="newRecipe.name"/></span>

       <span style="font-weight: 400">Finished recipe photo:</span>

         <div v-if="!newRecipe.photo">
           <input type="file" @change="onPhotoChange">
         </div>

         <div v-else>


         <img class="box-img" v-bind:src="newRecipe.photo"/>

         <button @click="removeRecipePhoto">Remove image</button>
 </div>

        <span><label for="ingredients">Ingredients:</label> <input type="text" id="ingredient" class="recipe-input" v-model="newIngredient" placeholder="eggs, flour, pasta, etc"/> <button class="blackbtn" @click="addIngredient">add ingredient</button><span style="color: red">{{ ingrErr }}</span></span>

        <div class="ingredients">
        <ul class="ingr">
            <li v-for="(ingredient, index) in ingredients" :key="index">
                <span class="remove" @click="removeIngr(index)">x</span> {{ ingredient }}</li>
            </ul>
        </div>



    <label for="instructions">Directions:</label>

      <div class="instructions">
        <p>
          moved item index: {{ testIndex }}<br />
          moved item id: {{ testId }}
        </p>

    <draggable :list="newRecipe.instructions" @change="change" :options="{draggable:'.recipe-text', animation: 200}">

      <div v-for="(box, index) in newRecipe.instructions" class="recipe-text" :key="index">

        <div class="box-item" v-if="editId !== box.id && box.hasImage === false">{{ box.text }}<br /><br />
          order: {{ box.order }}<br />
          index: {{ index }}<br />
          id: {{ box.id }}<span class="box-item-buttons"><button class="box-edit" @click="editTrue(box.id)">edit</button><button class="box-edit" @click="remove(index)">x
        </button></span></div>

        <div class="box-item" v-if="editId !== box.id && box.hasImage === true"><img class="box-img" :src="box.image" /><span class="box-item-buttons"><button class="box-edit" @click="editTrue(box.id)">edit</button><button class="box-edit" @click="remove(index)">x
        </button></span></div>

        <div class="box-edit-item" v-if="editing === true && editId === box.id && box.hasImage === false">
          <textarea name="instructions" class="recipe-textarea" v-model="box.text">{{ box.text }}</textarea><br />
          <span><button @click="editBox(box.id)" class="box-edit">save changes</button> <button class="box-edit" @click="cancel">cancel</button></span>

        </div>

        <div class="box-edit-item" v-if="editing === true && editId === box.id && box.hasImage === true">

          <div v-if="!editImg">
            <img class="box-img" v-bind:src="box.image"/>
          </div>

          <div v-else>
            <img class="box-img" v-bind:src="editImg"/>
  </div>

  <input type="file" @change="onImgChange">
        <br />
          <span><button @click="editImage(box.id)" class="box-edit">save changes</button> <button class="box-edit" @click="cancel">cancel</button></span>

        </div>


        <br />

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

      <span><label for="tags">Tags:</label> <input type="text" id="tag" class="recipe-input" v-model="newTag" placeholder="dinner, holiday, etc"/> <button class="blackbtn" @click="addTag">add tag</button> <span style="color: red">{{ tagErr }}</span></span>

        <p>
        <ul class="tag-ul">
            <li v-for="(t, index) in tags" :key="index">
                <span class="remove" @click="removeTag(index)">x</span> <span class="tag-text">{{ t }}</span></li>
            </ul>
        </p>

      <button class="pinkbtn" @click="saveRecipe">save recipe</button>
<span style="color: red">{{ error }}</span>
</div>


</div>
</template>
<script>
import draggable from 'vuedraggable'
import axios from 'axios'
export default {
data(){
    return {
        newRecipe: {
            name: '',
            instructions: [],
            photo: ''
        },
        newBox: {
          text: '',
          id: '',
          image: '',
          hasImage: false,
          order: undefined
        },
        imgError: '',
        textError: '',
        newImage: '',
        text: false,
        image: false,
        itemChosen: false,
        editText: '',
        editImg: '',
        newIngredient: '',
        ingredients: [],
        newTag: '',
        tags: [],
        error: '',
        tagErr: '',
        ingrErr: '',
        newText: {
          text: '',
          order: undefined
        },
        contentArray: [],
        boxes: [],
        editing: false,
        editId: '',
        testIndex: undefined,
        testId: ''
      }
},

components: {
  draggable
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


    onPhotoChange(e) {
      var files = e.target.files || e.dataTransfer.files;
         if (!files.length)
        return;
      this.createPhoto(files[0]);
    },

    createPhoto(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
          this.newRecipe.photo = vm.image;
      };
      reader.readAsDataURL(file);
    },

    removeRecipePhoto: function (e) {
      this.newRecipe.photo = '';
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

// FINISHED RECIPE PHOTO UPLOAD

  onPhotoChange(e) {
    var files = e.target.files || e.dataTransfer.files;
       if (!files.length)
      return;
    this.createPhoto(files[0]);
  },

  createPhoto(file) {
    var image = new Image();
    var reader = new FileReader();
    var vm = this;

    reader.onload = (e) => {
      vm.image = e.target.result;
        this.newRecipe.photo = vm.image;
    };
    reader.readAsDataURL(file);
  },

  removeRecipePhoto: function (e) {
    this.newRecipe.photo = '';
  },

  onImgChange(e) {
    var files = e.target.files || e.dataTransfer.files;
     if (!files.length)
     return;
     this.createEditImage(files[0]);
   },

        createEditImage(file) {
              var image = new Image();
              var reader = new FileReader();
              var vm = this;

              reader.onload = (e) => {
                vm.image = e.target.result;
                this.editImg = vm.image;
        };
          reader.readAsDataURL(file);
    },

      removeEditImage: function (e) {
          this.editImg = '';
    },



  onInput: function(value, index){
    this.newText.text = value;
    this.newText.order = index;

    this.contentArray.push(this.newtext);
    this.newText = {}


  },

    addText: function(index){

if(this.newBox.text){
      var number = Date.now() + Math.random().toString().slice(18);

  var id = 'a' + number;

        this.newBox.id = id;
        this.newBox.hasImage = false;


      this.newRecipe.instructions.push(this.newBox);
      this.newBox = {};
      this.itemChosen = false;
      this.text = false;
      this.addIndex();
    } else {

      this.textError = "Text field cannot be blank"
    }

    },

    addIndex: function(){

      this.newRecipe.instructions.map((item, index) => {

        return item.order = index;

      });

    },

    change: function(evt){

      var i = evt.moved.newIndex;
     this.testIndex = i;

     var e = evt.moved.element;
     this.testId = e.id;

      this.newRecipe.instructions.forEach((item, index) => {

        item.order = index;

      });

    },


    addImage: function(){

      if(this.newBox.image){

      var number = Date.now() + Math.random().toString().slice(18);

  var id = 'a' + number;

        this.newBox.id = id;
        this.newBox.hasImage = true;


      this.newRecipe.instructions.push(this.newBox);
      this.newBox = {};
      this.itemChosen = false;
      this.image = false;
      this.addIndex();
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

      var index = this.newRecipe.instructions.findIndex(b => b.id === boxId);

      var box = this.newRecipe.instructions.find(b => b.id === boxId);

      var updatedBox = {
        text: box.text,
        id: boxId,
        image: box.image,
        hasImage: false,
        order: box.order
      }

      this.newRecipe.instructions.splice(index, 1, updatedBox);
      this.editing = false;
      this.editId = ''
      this.editText = ''



    },

    editImage: function(id){

      var boxId = id;

          var index = this.newRecipe.instructions.findIndex(b => b.id === boxId);

          var box = this.newRecipe.instructions.find(b => b.id === boxId);

          var updatedBox = {
            text: box.text,
            id: boxId,
            image: this.editImg,
            hasImage: true,
            order: box.order
          }

          this.newRecipe.instructions.splice(index, 1, updatedBox);
          this.editing = false;
          this.editId = '';
          this.editImg = ''

    },

    cancel: function(){
      this.editing = false;
      this.editId = '';
      this.editText = '';
    },



    remove: function(index){

      this.newRecipe.instructions.splice(index, 1);

      this.newRecipe.instructions.forEach((item, index) => {

        item.order = index;

      });

    },

    addIngredient: function(){
      if(this.newIngredient !== ''){
            this.ingredients.push(this.newIngredient);
            this.newIngredient = '';
          } else {
            this.ingrErr = "*Input can't be blank."
          }
        },

        removeIngr: function(index){
            var ingredients = this.ingredients;

            ingredients.splice(index, 1);
        },

    addTag: function(){
      if(this.newTag !== ''){
            this.tags.push(this.newTag);
            this.newTag = '';
          } else {
            this.tagErr = "*Input can't be blank."
          }
        },

        removeTag: function(index){
            var tags = this.tags;

            tags.splice(index, 1);
        },

    saveRecipe: function(){

      if(this.newRecipe.name && this.ingredients && this.newRecipe.instructions && this.tags && this.newRecipe.photo){

        axios.post('http://localhost:3000/recipes', {
            name: this.newRecipe.name,
            ingredients: this.ingredients,
            instructions: this.newRecipe.instructions,
            tags: this.tags,
            photo: this.newRecipe.photo

        }).then((response) => {
            this.$store.commit('saveRecipe', {recipe: response.data});

            var data = response.data;
            this.$store.dispatch('loadRecipes');
            this.$router.push({ name: 'RecipePage', params: { id: data._id }});

        });
      } else {
        this.error = "*Please fill out all fields"
      }

    }


},

name: 'NewRecipe'
}
</script>
<style>

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

.recipe-form {
display: grid;
grid-gap: 25px;
padding: 25px;
align-content: flex-start;
min-height: 500px;
font-family: 'Roboto';
}

.recipe-input{
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

    }

    .tags-list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    }

    .tags-list li {
        display: inline-block;


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


.box-textarea {
  font-weight: 300;
  font-size: 16px;
  padding: 10px 12px;
  width: 650px;
  min-height: 150px;
  border: 1px solid #777;
  border-radius: 8px;
}



    .recipe-textarea {
    font-weight: 300;
    font-size: 16px;
    padding: 10px 12px;
    width: 650px;
    min-height: 150px;
    border: 1px solid #777;
    border-radius: 8px;

    }

    .remove-btn {
    font-weight: 400;
    color: #aaa;
    margin-right: 4px;
    cursor: pointer;

    }

    .remove-btn:hover {
    color: #000;
    }

   .greybtn {
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

    .pinkbtn {
     border: none;
    border: 1px solid #F08080;
    border-radius: 6px;
    background-color: #F08080;
    padding: 6px 10px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
   max-width: 150px;
    }

     .blackbtn {
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


    .back-to-selection {
    cursor: pointer;
    text-decoration: none;
    color: #F08080;
    transition: 0.3s;
    border-bottom: 1px solid transparent;
    padding-bottom: 1px;
    display: inline-block;
    font-size: 16px;
    }

    .back-to-selection:hover {
      border-bottom: 1px solid #F08080;
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
</style>
