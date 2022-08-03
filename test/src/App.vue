<template>
  <TagsInput
    v-model='tags'
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
</template>

<script setup>
import { ref } from 'vue'
import { TagsInput } from '../../dist/voerro-vue3-tagsinput.es'

const tags = ref([])
</script>