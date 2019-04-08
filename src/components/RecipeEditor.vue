<template>
      <div class="recipe-editor">

    <div class="recipe-edit-form">
       <span><label for="name">Name:</label> <input  type="text" class="recipe-edit-input" v-model="recipeEdit.name" :placeholder="recipe.name"/></span>

       <span style="font-weight: 400">Finished recipe photo:</span>

         <div v-if="!recipeEdit.photo">
           <input type="file" @change="onPhotoChange">
         </div>

         <div v-else>


         <img class="box-img" v-bind:src="recipeEdit.photo"/>

         <button @click="removeRecipePhoto">Remove image</button>
 </div>

        <span><label for="ingredients">Ingredients:</label> <input type="text" class="recipe-edit-input" v-model="newIngredient.text" placeholder="e.g. eggs, flour, etc"/> <button class="blackbtn" @click="addIngredient">add</button></span>

        <div class="ingredients">

          <draggable :list="recipeEdit.ingredients" @change="ingrChange" :options="{draggable: '.recipe-ingr', animation: 200}">

            <div class="recipe-ingr" v-for="(ingredient, index) in recipeEdit.ingredients" :key="index">
                <span class="remove" @click="removeIngr(index)">x</span> {{ ingredient.text }}</li>
          </div>

          </draggable>
        </div>

        <label for="instructions">Directions:</label>


              <div class="instructions">

            <draggable :list="recipeEdit.instructions" :options="{draggable:'.recipe-text', animation: 200}" @change="change">

              <div v-for="(box, index) in recipeEdit.instructions" class="recipe-text" :key="index">

                <div class="box-item" v-if="editId !== box.id && box.hasImage === false"><span v-html="box.text">

                </span>

                  <span class="box-item-buttons"><button class="box-edit" @click="editBoxText(box.id)">edit</button><button class="box-edit" @click="remove(index)">x
                </button></span></div>

                <div class="box-item" v-if="editId !== box.id && box.hasImage === true"><img class="box-img" :src="box.image" /> <br /><br />
                  <span class="box-item-buttons"><button class="box-edit" @click="editTrue(box.id)">edit</button><button class="box-edit" @click="remove(index)">x
                </button></span></div>

                <div class="box-edit-item" v-if="editing === true && editId === box.id && box.hasImage === false">

                  <ckeditor :editor="editor" v-model="boxText" :config="editorConfig" @input="checkEditText"></ckeditor><br /><br />

                  <span class="lil-buttons"><button v-if="editText" @click="editBox(box.id)" class="box-edit">save changes</button> <button class="box-edit" @click="cancel">cancel</button></span>

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
                            <span><button v-if="editImg" @click="editImage(box.id)" class="box-edit">save changes</button> <button class="box-edit" @click="cancel">cancel</button></span>

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


              <ckeditor :editor="editor" v-model="newBoxText" :config="editorConfig"></ckeditor>

              <span class="lil-buttons">
                <button class="box-img-buttons" v-if="newBoxText" @click="addText">add text</button>
                <button class="box-img-buttons" v-if="itemChosen === true" @click="backToSelection">back
                </button>
              </span>
                <p style="color: red">{{ textError }}</p>
        </div>

          <div class="new-box-img-cover" @click="showImage" v-if="itemChosen === false">
            <p>
              add image
            </p>
          </div>

              <div class="new-box-img" v-if="itemChosen === true && text === false">
                <div v-if="!newBoxImg">
                  <p style="font-weight: 400">
                    Choose an image:
                  </p>
                  <input type="file" @change="onFileChange">
                </div>

                <div v-else>


                <img class="box-img" v-bind:src="newBoxImg"/>

                <button @click="removeImage">Remove image</button>
        </div>
            </div>
          </div>

        <div v-if="itemChosen === true && text === false">
                <button class="box-img-buttons" v-if="newBoxImg" @click="addImage">add image</button> <button class="box-img-buttons" v-if="itemChosen === true" @click="backToSelection">back
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

<span class="btnsrow">
  <span class="item1">
      <button class="pinkbtn" @click="editRecipe(recipe)">save changes</button></span>

      <span class="item2">
      <button class="delete-btn" @click="deleteRecipe(recipe._id)">delete recipe</button>
    </span>
    </span>

    </div>

    </div>
</template>
<script>
import draggable from 'vuedraggable'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'
export default {
data(){
    return {
      editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                },
        recipeEdit: {
            name: '',
            instructions: [],
           ingredients: [],
            tags: [],
            photo: ''
        },
        newIngredient: {
          text: '',
          id: '',
          order: undefined
        },
        newTag: '',
        newBox: {
          text: '',
          id: '',
          image: '',
          hasImage: false,
          order: undefined
        },
        newBoxText: '',
        newBoxImg: '',
        boxText: '',
        editText: '',
        imgError: '',
        textError: '',
        text: false,
        image: false,
        itemChosen: false,
        editing: false,
        testIndex: undefined,
        testId: '',
        editImg: ''
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
          this.newBoxText = '';
          this.newBoxImg = '';

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
              this.recipeEdit.photo = vm.image;
          };
          reader.readAsDataURL(file);
        },

        removeRecipePhoto: function (e) {
          this.recipeEdit.photo = '';
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
              this.newBoxImg = vm.image;
          };
          reader.readAsDataURL(file);
        },

        removeImage: function (e) {
          this.newBoxImg = '';
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

          addText: function(){

      if(this.newBoxText){
            var number = Date.now() + Math.random().toString().slice(18);

        var id = 'a' + number;

              this.newBox.id = id;
              this.newBox.hasImage = false;
              this.newBox.text = this.newBoxText;


            this.recipeEdit.instructions.push(this.newBox);
            this.newBox = {};
            this.itemChosen = false;
            this.text = false;
            this.newBoxText = '';
            this.addIndex();
          } else {

            this.textError = "Text field cannot be blank"
          }

          },

          addImage: function(){

            if(this.newBoxImg){

            var number = Date.now() + Math.random().toString().slice(18);

        var id = 'a' + number;

              this.newBox.id = id;
              this.newBox.hasImage = true;
              this.newBox.image = this.newBoxImg;


            this.recipeEdit.instructions.push(this.newBox);
            this.newBox = {};
            this.newBoxImg = '';
            this.itemChosen = false;
            this.image = false;
            this.addIndex();
      } else {

        this.imgError = "Please select an image"
      }

          },

          addIndex: function(){

            this.recipeEdit.instructions.map((item, index) => {

              return item.order = index;

            });

          },

          change: function(evt){

            var i = evt.moved.newIndex;
           this.testIndex = i;

           var e = evt.moved.element;
           this.testId = e.id;

            this.recipeEdit.instructions.forEach((item, index) => {

              item.order = index;

            });

          },

          editTrue: function(id){

            this.editing = true;

            this.editId = id;


          },


              editBoxText: function(id){

                this.editing = true;
                this.editId = id;

                var box = this.recipeEdit.instructions.find(b => b.id === id);

                this.boxText = box.text;
              },

              checkEditText: function(){


                this.editText = this.boxText;

              },

          editBox: function(id){



        var boxId = id;

            var index = this.recipeEdit.instructions.findIndex(b => b.id === boxId);

            var box = this.recipeEdit.instructions.find(b => b.id === boxId);

            var updatedBox = {
              text: this.editText,
              id: boxId,
              image: box.image,
              hasImage: false,
              order: box.order
            }

            this.recipeEdit.instructions.splice(index, 1, updatedBox);
            this.editing = false;
            this.editId = ''
            this.editText = ''
            this.boxText = ''



          },

          editImage: function(id){

            var boxId = id;

                var index = this.recipeEdit.instructions.findIndex(b => b.id === boxId);

                var box = this.recipeEdit.instructions.find(b => b.id === boxId);

                var updatedBox = {
                  text: box.text,
                  id: boxId,
                  image: this.editImg,
                  hasImage: true,
                  order: box.order
                }

                this.recipeEdit.instructions.splice(index, 1, updatedBox);
                this.editing = false;
                this.editId = '';
                this.editImg = ''

          },

          cancel: function(){
            this.editing = false;
            this.editId = '';
            this.editText = '';
            this.boxText = '';
          },



          remove: function(index){

            this.recipeEdit.instructions.splice(index, 1);

            this.recipeEdit.instructions.forEach((item, index) => {

              item.order = index;

            });

          },


              addIngredient: function(){
                if(this.newIngredient.text !== ''){

                  var number = Date.now() + Math.random().toString().slice(18);
                  var id = 'b' + number;

                  this.newIngredient.id = id;

                      this.recipeEdit.ingredients.push(this.newIngredient);
                      this.newIngredient = {};

                      this.addIngrIndex();
                    } else {
                      this.ingrErr = "*Input can't be blank."
                    }
                  },

                  addIngrIndex: function(){

                    this.recipeEdit.ingredients.map((item, index) => {

                      return item.order = index;

                    });

                  },

                  removeIngr: function(index){

                      this.recipeEdit.ingredients.splice(index, 1);

                      this.recipeEdit.ingredients.forEach((item, index) => {

                        item.order = index;
                  });
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



        let path = 'https://debbskitchen-server.herokuapp.com/recipes/' +recipe._id;

        let data = {
            _id: this.recipe._id,
            name: this.recipeEdit.name,
            ingredients: this.recipeEdit.ingredients,
            instructions: this.recipeEdit.instructions,
            tags: this.recipeEdit.tags,
            photo: this.recipeEdit.photo

            };

        axios.put(path, data).then((response) => {
            this.$store.commit('editRecipe', {recipe: response.data});
            this.$store.dispatch('loadRecipes');

        });
        this.$emit('close');


      },



              deleteRecipe: function(_id){


                  let path = 'https://debbskitchen-server.herokuapp.com/recipes/' +_id;

                  axios.delete(path).then((response) => {
                      this.$store.commit('deleteRecipe', {id: response.data});

                      this.$router.push('/recipes');
                      this.$store.dispatch('loadRecipes');
                       });



                  }
    }
}

</script>
<style>

.btnsrow {
  display: grid;
  grid-template-columns: auto auto;

}

.item1 {
  display: grid;
  justify-content: flex-start;
}

.item2 {
  display: grid;
  justify-content: flex-end;
}

.delete-draft {
  display: grid;
  justify-content: flex-end;
}

.draft-buttons {
display: grid;
grid-template-columns: auto auto;
grid-gap: 20px;
justify-content: flex-start;
}

.recipe-editor {
  display: grid;
  width: 800px;
}

    .recipe-edit-form {
display: grid;
grid-gap: 25px;
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
      font-weight: 400;
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
    width: 100%;
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
    height: 100px;
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
      height: 100px;
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

    .photo-buttons {

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
      font-weight: 300;
      line-height: normal;
    font-family: 'Roboto';
    font-size: 16px;
      cursor: pointer;
      max-height: 30px;

    }

    .box-edit:hover {
      background-color: #767676;
      border: 1px solid transparent;
      color: #fff;
    }

    .box-img-buttons {
      background-color: #aaa;
      border: 1px solid transparent;
      transition: 0.3s;
      border-radius: 4px;
      color: #fff;
      padding: 4px 6px;
      font-weight: 300;
      line-height: normal;
    font-family: 'Roboto';
    font-size: 16px;
      cursor: pointer;
      max-height: 30px;
  margin-right: 8px;
    }

    .box-img-buttons:hover {
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

      @media screen and (max-width: 1000px){

        .recipe-editor {
          width: auto;
        }

        .new-box-text {
          width: 500px;
        }
      }

      @media screen and (max-width: 766px){

        .recipe-editor {
          width: auto;
        }

        .new-box-text {
          width: 500px;
        }
      }


      @media screen and (max-width: 590px){
        .new-box-text  {
          width: 370px;
        }
      }


      @media screen and (max-width: 400px){
        .new-box-text  {
          width: 300px;
        }
      }

</style>
