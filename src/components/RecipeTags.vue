<template>
  <div class="tags-section">
    <p id="tags-paragraph">
      <span class="section">Tags:</span>
      <span class="tag" v-for="tag in recipe.tags" @click="findTag(tag)">{{ tag }}</span></p>
  </div>
</template>
<script>
export default {
  name: 'RecipeTags',
  props: {
    selectedTag: {
      type: String
    },
    recipe: {
      required: true
    }
  },
  methods: {
    findTag(tag){
      this.selectedTag = tag;
      this.$router.push({ name: 'TagResults', params: { selectedTag: this.selectedTag }});
    }
  }
}
</script>
