<template>
  <div class="tags">
    <VueTagsinputV
      v-model="tags"
      :placeholder="'Type a tag'"
    />
  </div>

  <hr>

  Selected tags: {{ tags }}
</template>

<script setup>
import {
  ref
} from 'vue'
import VueTagsinputV from 'vue-tagsinput-v'

const tags = ref([])
</script>

<style>
.tags {
  background-color: #eee;
  border-radius: 3px;
  padding: 10px;
}
</style>