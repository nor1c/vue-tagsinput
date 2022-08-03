<template>
  <div>
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
    </div>

    <button @click="clearTags()">CLEAR TAGS</button>
    <button @click="initPrevious()">PREVIOUS TAGS</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TagsInput } from '../../dist/voerro-vue3-tagsinput.es'

const tags = ref([])
const prev = ref([])

const clearTags = () => {
  prev.value = tags.value
  tags.value = []
}

const initPrevious = () => {
  tags.value = []
  tags.value = prev.value
}
</script>