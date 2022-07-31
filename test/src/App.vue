<template>
  <TagInput 
    v-model='tags'
    :placeholder="'Type a tag'"
  />
</template>

<script setup>
import { ref } from 'vue'
import TagInput from '../../src/App.vue'

const tags = ref([])
</script>