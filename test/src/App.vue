<template>
  <TagsInput
    v-model='tags'
    :placeholder="'Type a tag'"
  />

  {{ tags }}
</template>

<script setup>
import { ref } from 'vue'
import { TagsInput } from '../../dist/voerro-vue3-tagsinput.es'

const tags = ref([])
</script>