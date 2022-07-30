<template>
  <NTagsInput
    v-model="tags"
    :placeholder="'Type a tag'"
    @input="onInput"
  />

  Selected tags: {{ tags }}
  
  <input type="text" v-model="input"> {{ input }}
</template>

<script setup>
import {
  ref
} from 'vue'
import NTagsInput from '../../src/App.vue'

const tags = ref([])
const input = ref('')

const trackTag = () => {
  console.log(tags.value)
}

const onInput = (val, valObj, ipt) => {
  console.log([val, valObj, ipt]);
  if (valObj?.formatted) {
    tags.value.push(valObj.formatted)
  }
}
</script>