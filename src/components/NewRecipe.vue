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

    <span><label for="ingredients">Ingredients:</label> <input type="text" id="ingredient" class="recipe-input" v-model="newIngredient.text" placeholder="eggs, flour, pasta, etc"/> <button class="blackbtn" @click="addIngredient">add ingredient</button><span style="color: red">{{ ingrErr }}</span></span>

    <div class="ingredients">
      <draggable :list="ingredients" @change="ingrChange" :options="{draggable: '.recipe-ingr', animation: 200}">
        <div class="recipe-ingr" v-for="(ingredient, index) in ingredients" :key="index">
          <span class="remove" @click="removeIngr(index)">x</span> {{ ingredient.text }}</li>
        </div>
      </draggable>
    </div>

    <label for="instructions">Recipe directions:</label>
    <div class="instructions">
      <draggable :list="newRecipe.instructions" @change="change" :options="{draggable:'.recipe-text', animation: 200}">
        <div v-for="(box, index) in newRecipe.instructions" class="recipe-text" :key="index">
        <div class="box-item" v-if="editId !== box.id && box.hasImage === false">
          <span v-html="box.text"></span>
          <span class="box-item-buttons"><button class="box-edit" @click="editBoxText(box.id)">edit</button><button class="box-edit" @click="remove(index)">x
          </button></span>
        </div>
        <div class="box-item" v-if="editId !== box.id && box.hasImage === true">
          <img class="box-img" :src="box.image" /><span class="box-item-buttons"><button class="box-edit" @click="editTrue(box.id)">edit</button><button class="box-edit" @click="remove(index)">x
          </button></span>
        </div>
        <div class="box-edit-item" v-if="editing === true && editId === box.id && box.hasImage === false">
          <ckeditor :editor="editor" tag-name="textarea" v-model="boxText" :config="editorConfig" @input="checkEditText">{{ boxText }}</ckeditor><br /><br />

          <span class="lil-buttons"><button v-if="editText" @click="editBox(box.id)" class="box-edit">save changes</button> <button class="box-edit" @click="cancel(box)">cancel</button></span>
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
          <span class="lil-buttons"><button @click="editImage(box.id)" class="box-edit">save changes</button> <button class="box-edit" @click="cancel(box)">cancel</button></span>
        </div>
        <br />
      </div>
  </draggable>
  <div v-if="editing === false">
    <div class="new-box">
      <div class="new-box-text-cover" @click="showText" v-if="itemChosen === false">
        <p>add text</p>
      </div>
  <div class="new-box-text" v-if="text === true && itemChosen === true">
    <ckeditor class="box-editor" :editor="editor" v-model="newBoxText" :config="editorConfig"></ckeditor>
    <span class="lil-buttons">
        <button v-if="newBoxText" class="box-edit" @click="addText">add text</button>
        <button class="box-edit" v-if="itemChosen === true" @click="backToSelection">back
        </button>
    </span>
      <p style="color: red">{{ textError }}</p>
  </div>

  <div class="new-box-img-cover" @click="showImage" v-if="itemChosen === false">
    <p>add image</p>
  </div>
  <div class="new-box-img" v-if="itemChosen === true && text === false">
    <div v-if="!newBoxImg">
      <p style="font-weight: 300">Choose an image:</p>
      <input type="file" @change="onFileChange">
    </div>
    <div v-else>
      <img class="box-img" v-bind:src="newBoxImg"/>
      <button @click="removeImage">Remove image</button>
    </div>
    </div>
  </div>

  <div v-if="itemChosen === true && text === false">
    <span class="lil-buttons">
        <button v-if="newBoxImg" class="box-edit" @click="addImage">add image</button> <button class="box-edit" v-if="itemChosen === true" @click="backToSelection">back
        </button>
        </span>
        <p>
          <span style="color: red">{{ imgError }}</span>
        </p>
        </div>
  </div>
</div>

  <span><label for="tags">Tags:</label> <input type="text" id="tag" class="recipe-input" v-model="newTag" placeholder="dinner, holiday, etc"/> <button class="blackbtn" @click="addTag">add tag</button> <span style="color: red">{{ tagErr }}</span></span>

    <p><ul class="tag-ul">
      <li v-for="(t, index) in tags" :key="index">
        <span class="remove" @click="removeTag(index)">x</span> <span class="tag-text">{{ t }}</span></li>
        </ul>
    </p>

    <span class="btnsrow-simple">
      <button class="pinkbtn" @click="saveRecipe">publish recipe</button>
      <button class="darkgreybtn" @click="saveDraft">save as draft</button>
    </span>
      <span style="color: red">{{ draftErr }}</span>
      <span style="color: red">{{ error }}</span>
    </div>
</div>
</template>
<script>
import draggable from 'vuedraggable'
import recipesMixin from '@/mixins/recipesMixin'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'
export default {
mixins: [recipesMixin],
data(){
    return {
      editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
                    // The configuration of the editor.
            },
        newRecipe: {
            name: '',
            instructions: [],
            photo: '',
            hasPhoto: false
        },
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
        newIngredient: {
          text: '',
          id: '',
          order: undefined
        },
        ingredients: [],
        imgError: '',
        textError: '',
        newImage: '',
        text: false,
        image: false,
        itemChosen: false,
        boxCopy: {},
        editImg: '',
        newTag: '',
        tags: [],
        error: '',
        tagErr: '',
        ingrErr: '',
        newText: {
          text: '',
          order: undefined
        },
        boxes: [],
        editing: false,
        editId: '',
        testIndex: undefined,
        testId: '',
        draftErr: ''
      }
},
name: 'NewRecipe',
components: {
  draggable
},
methods: {
  saveDraft(){
    let draft = {};
    draft.name = this.newRecipe.name;
    draft.instructions = this.newRecipe.instructions;
    draft.photo = this.newRecipe.photo;
    draft.hasPhoto = this.newRecipe.hasPhoto;
    draft.tags = this.tags;

    if(draft.name){

    axios.post('https://debbskitchen-server.herokuapp.com/drafts', {
      name: draft.name,
      instructions: draft.instructions,
      ingredients: this.ingredients,
      tags: this.tags,
      photo: draft.photo,
      hasPhoto: draft.hasPhoto
    }).then((response) => {
      this.$store.commit('saveDraft', {draft: response.data});
      this.$store.dispatch('loadDrafts');
      this.$router.push('/recipes/drafts');
      });
    } else {
      this.draftErr = 'Recipe must have a name'
    }
  },

  backToSelection(){
    this.itemChosen = false;
    this.text = false;
    this.image = false;
    this.newBox = {};
    this.imgError = '';
    this.textError = '';
    this.newBoxText = '';
    this.newBoxImg = '';
  },

  showText(){
    this.text = true;
    this.itemChosen = true;
  },

  showImage(){
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
        this.newBoxImg = vm.image;
    };
    reader.readAsDataURL(file);
  },

  removeImage(e) {
    this.newBoxImg = '';
  },

// FINISHED RECIPE PHOTO UPLOAD

  onPhotoChange(e) {
    let files = e.target.files || e.dataTransfer.files;
       if (!files.length)
      return;
    this.createPhoto(files[0]);
  },

  createPhoto(file) {
    let im = new Image();
    let reader = new FileReader();
    let vm = this;
    reader.onload = (e) => {
      vm.im = e.target.result;
        this.newRecipe.photo = vm.im;
        this.newRecipe.hasPhoto = true;
    };
    reader.readAsDataURL(file);
  },

  removeRecipePhoto (e) {
    this.newRecipe.photo = '';
    this.newRecipe.hasPhoto = false;
  },

  onImgChange(e) {
    let files = e.target.files || e.dataTransfer.files;
     if (!files.length)
     return;
     this.createEditImage(files[0]);
   },

  createEditImage(file) {
        let im = new Image();
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.im = e.target.result;
          this.editImg = vm.im;
        };
        reader.readAsDataURL(file);
    },

  removeEditImage(e) {
    this.editImg = '';
  },

  checkNewText(newBox){
    this.newBoxText = newBox.text;
  },

    addText(){
      if(this.newBoxText){
        let number = Date.now() + Math.random().toString().slice(18);
        let id = 'a' + number;
        this.newBox.id = id;
        this.newBox.hasImage = false;
        this.newBox.text = this.newBoxText;
        this.newRecipe.instructions.push(this.newBox);
        this.newBox = {};
        this.itemChosen = false;
        this.text = false;
        this.newBoxText = '';
        this.addIndex();
      } else {
        this.textError = "Text field cannot be blank"
      }
    },

    addIndex(){
      this.newRecipe.instructions.map((item, index) => {
        return item.order = index;
      });
    },

    change(evt){
      let i = evt.moved.newIndex;
      this.testIndex = i;

      let e = evt.moved.element;
      this.testId = e.id;
      this.newRecipe.instructions.forEach((item, index) => {
        item.order = index;
      });
    },

  ingrChange(evt){
    let i = evt.moved.newIndex;
    let e = evt.moved.element;
    this.ingredients.forEach((item, index) => {
        item.order = index;
      });
    },

    addImage: function(){
      if(this.newBoxImg){
        let number = Date.now() + Math.random().toString().slice(18);
        let id = 'a' + number;
        this.newBox.id = id;
        this.newBox.hasImage = true;
        this.newBox.image = this.newBoxImg;
        this.newRecipe.instructions.push(this.newBox);
        this.newBoxImg = '';
        this.newBox = {};
        this.itemChosen = false;
        this.image = false;
        this.addIndex();
      } else {
        this.imgError = "Please select an image"
      }
    },

    editTrue(id){
      this.editing = true;
      this.editId = id;
    },

    editBoxText(id){
      this.editing = true;
      this.editId = id;
      let box = this.newRecipe.instructions.find(b => b.id === id);
      this.boxText = box.text;
    },

    checkEditText(){
      this.editText = this.boxText;
    },

    editBox(id){
      let boxId = id;
      let index = this.newRecipe.instructions.findIndex(b => b.id === boxId);
      let box = this.newRecipe.instructions.find(b => b.id === boxId);
      let updatedBox = {
        text: this.editText,
        id: boxId,
        image: box.image,
        hasImage: false,
        order: box.order
      }
      this.newRecipe.instructions.splice(index, 1, updatedBox);
      this.editing = false;
      this.editId = ''
      this.editText = ''
      this.boxText = ''
    },

    editImage(id){
      let boxId = id;
      let index = this.newRecipe.instructions.findIndex(b => b.id === boxId);
      let box = this.newRecipe.instructions.find(b => b.id === boxId);
      let updatedBox = {
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

    cancel(){
      this.editing = false;
      this.editId = '';
      this.editText = '';
      this.boxText = ''
    },

    remove(index){
      this.newRecipe.instructions.splice(index, 1);
      this.newRecipe.instructions.forEach((item, index) => {
        item.order = index;
      });
    },

    addIngredient(){
      if(this.newIngredient.text !== ''){
        let number = Date.now() + Math.random().toString().slice(18);
        let id = 'b' + number;
        this.newIngredient.id = id;
        this.ingredients.push(this.newIngredient);
        this.newIngredient = {};
        this.addIngrIndex();
      } else {
        this.ingrErr = "*Input can't be blank."
      }
    },

    addIngrIndex(){
      this.ingredients.map((item, index) => {
        return item.order = index;
      });
    },

    removeIngr(index){
      let ingredients = this.ingredients;
      ingredients.splice(index, 1);
      ingredients.forEach((item, index) => {
          item.order = index;
        });
    },

    addTag(){
      if(this.newTag !== ''){
        this.tags.push(this.newTag);
        this.newTag = '';
      } else {
        this.tagErr = "*Input can't be blank."
      }
    },

    removeTag(index){
      let tags = this.tags;
      tags.splice(index, 1);
    },

/*    saveRecipe(){
      if(this.newRecipe.name !== '' && this.ingredients !== [] && this.newRecipe.instructions !== [] && this.tags !== [] && this.newRecipe.photo){
        axios.post('https://debbskitchen-server.herokuapp.com/recipes', {

          name: this.newRecipe.name,
          ingredients: this.ingredients,
          instructions: this.newRecipe.instructions,
          tags: this.tags,
          photo: this.newRecipe.photo,
          hasPhoto: this.newRecipe.hasPhoto

        }).then((response) => {
            this.$store.commit('saveRecipe', {recipe: response.data});
            let data = response.data;
            this.$store.dispatch('loadRecipes');
            this.$router.push({ name: 'RecipePage', params: { id: data._id }});
        });

      } else {
        this.error = "*Please fill out all fields"
      }
    }

    */
  }
}
</script>
<style>

.btnsrow-simple {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: flex-start;
  grid-gap: 15px;

}

.recipe-ingr {
cursor: pointer;
}


.box-img {
  width: auto;
  max-height: 500px;
}

.new-box {
display: grid;
grid-template-columns: auto auto;

grid-gap: 10px;
margin-bottom: 10px;
}

.new-box-text {
width: 700px;
}

.box-editor {
min-height: 300px;
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
grid-gap: 5px;
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

.drag-ghost {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px dashed #ddd;
  border-radius: 6px;
  min-height: 200px;
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

.new-recipe {
  width: 800px;
}

@media screen and (max-width: 1000px){

  .new-recipe {
    width: auto;

  }

  .new-box-text {
    width: 600px;
  }
}

@media screen and (max-width: 766px){

  .new-recipe {
    width: auto;

  }

  .new-box-text {
    width: 500px;
  }
}


@media screen and (max-width: 590px){
  .new-box-text {
    width: 370px;
  }
}


@media screen and (max-width: 400px){
  .new-box-text {
    width: 300px;
  }
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
  min-height: 150px;
  width: 650px;
  border: 1px solid #777;
  border-radius: 8px;
}



    .recipe-textarea {
    font-weight: 300;
    font-size: 16px;
    padding: 10px 12px;
    width: 100%;
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
