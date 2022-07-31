<template>
  tags input here:
  <TagsInput
    v-model="tags"
    :placeholder="'Type a tag'"
  />
</template>

<script setup>
import {
  ref
} from 'vue'
import TagsInput from "./components/TagsInput.vue"

const tags = ref([])
</script>