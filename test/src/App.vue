<template>
  <TagInput 
    v-model='tags'
    :placeholder="'Type a tag'"
  />
</template>

<script setup>
import { ref } from 'vue'
import TagInput from 'vue-tagsinput-v'

const tags = ref([])
</script>