<template>
<div class="drafts-page">
 <div class="drafts-page-container">
   <div v-if="!drafts.length">
     <p>
       No drafts saved!
     </p>
   </div>
<div class="drafts" v-if="showDraftEditor == false">


<div class="draft-container" v-for="draft in drafts" :key="draft._id">
  <p>
    <span class="draft-name" @click="openDraftEditor(draft)">{{ draft.name }}</span><br />
  </p>

</div>
</div>

<draft-editor v-if="showDraftEditor == true" :draft="selectedDraft" @close="closeDraftEditor"></draft-editor>

</div>
</div>

</template>
<script>
export default {
data() {
    return {
      showDraftEditor: false,
      selectedDraft: undefined,
      drafts: []
    }
},

components: {
  DraftEditor: () => import('@/components/DraftEditor.vue')
},
  async created(){
    this.drafts = await this.$api.$drafts.getDrafts()
  },
    computed: {
      /*

      drafts(){

        return this.$store.getters.drafts;

      }
      */
    },

    methods: {

      openDraftEditor: function(draft){
          this.showDraftEditor = true;
          this.selectedDraft = draft;

      },

      closeDraftEditor: function(){
          this.showDraftEditor = false;

      }

    },

name: 'DraftsPage'
}
</script>
<style>

.draft-name {
font-weight: 400;
color: #F08080;
cursor: pointer;
transition: 0.2s;
}

.draft-name:hover {
  color: #000;
}

.drafts {

display: grid;
grid-gap: 10px;
}

.draft-container {
}

.draft-img {
  width: auto;
  max-height: 300px;
}

.drafts-page {
display: grid;
background-color:#f9f9f9;
align-content: flex-start;
justify-content: flex-start;
padding: 30px;
width: 850px;
}

    .drafts-page-title {
    width: 100%;
    text-align: center;
    padding: 20px;
    }

.drafts-page h1 {
padding-top: 0;
margin-top: 0;
font-weight: 300;
font-size: 34px;
text-align: center;

}

    .drafts-page-container {
    display: grid;
    padding: 30px;
    }


    @media screen and (max-width: 1200px){

      .drafts-page {
      width: 850px;
      padding: 30px;
          }


    }

    @media screen and (max-width: 1000px){

      .drafts-page {
      width: 800px;
      padding: 30px;
      }


    }

    @media screen and (max-width: 970px){

      .drafts-page {
      width: 700px;
      padding: 30px;
      }

      .drafts-page h1 {
        font-size: 30px;
      }


    }

    @media screen and (max-width: 766px){

    .drafts-page {
      width: 550px;
      padding: 20px;
      }

      .drafts-page h1 {
        font-size: 28px;
      }


    }

    @media screen and (max-width: 590px){

      .drafts-page {
      width: 400px;
      padding-left: 20px;
      padding-right: 20px;
      }

      .drafts-page h1 {
        font-size: 28px;
      }

      .drafts-page-container {
        padding: 20px;
      }


    }

    @media screen and (max-width: 400px){

      .drafts-page {
      width: 360px;
      padding-left: 5px;
      padding-right: 5px;
      }

      .drafts-page h1 {
        font-size: 25px;
      }


    }

</style>
