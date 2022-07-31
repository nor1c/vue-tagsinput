<template>
  <TagsInput
    v-model="tags"
    :placeholder="'Type a tag'"
  />

  {{ tags }}
</template>

<script setup>
import {
  ref
} from 'vue'
import TagsInput from "./TagsInput.vue"

const tags = ref([])
</script>