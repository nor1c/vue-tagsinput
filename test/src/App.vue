<template>
  <div>
    <TagsInput
      v-model="tags"
      :placeholder="'Type a tag'"
      :typeahead="true"
      :limit="10"
      :hide-input-on-limit="true"
      :typeahead-style="'dropdown'"
      :typeahead-activation-threshold="1"
      :typeahead-show-on-focus="true"
      :typeahead-hide-discard="true"
      :typeahead-url="'http://192.168.100.5:2021/artworks/tags/search?keyword=:search'"
      :add-tags-on-comma="true"
    />
    {{ tags }}

    <button @click="printTags()">Print selected tags</button>
  </div>


  <div>
    {{ numbers }}

    <button @click="addNumber()">print input text</button>
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import { TagsInput } from '../../dist/voerro-vue3-tagsinput.es'

const tags = ref([])

const printTags = () => {
  console.log(tags.value)
}

const numbers = ref([])
const currNumber = ref(0)
const addNumber = () => {
  currNumber.value+=1

  numbers.value.push(currNumber.value)

  console.log(toRaw(numbers.value))
}
</script>