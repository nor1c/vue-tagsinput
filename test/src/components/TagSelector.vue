<template>
  <div>
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
          :initial-value="initTags"
        />
        {{ tags }}
      </div>

      <button style="background-color: pink; margin: 5px;" @click="apply()">APPLY TAGS</button>
    </div>

    <button style="background-color: aquamarine;" @click="$emit('closeTagSelector')">CLOSE TAG SELECTOR</button>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw, toRef } from 'vue'
import { TagsInput } from '../../../dist/voerro-vue3-tagsinput.es'

const emits = defineEmits([
  'closeTagSelector',
  'apply'
])

const initTags = [
  { key: 1, value: 'test' }
]

onMounted (() => {
  init(initTags)
})

const tags = ref([])

const init = (previousSelectedTags) => {
  tags.value = previousSelectedTags
}

const selectedTags = ref([])
const apply = () => {
  selectedTags.value = tags.value
  tags.value = []
  emits('apply', toRaw(selectedTags.value))
}

defineExpose({
  init
})
</script>

<style>
/* The input */
.tags-input {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tags-input input {
  flex: 1;
  background: transparent;
  border: none;
}

.tags-input input:focus {
  outline: none;
}

.tags-input input[type="text"] {}

.tags-input-wrapper-default {}

.tags-input-wrapper-default.active {
  outline: 0 none;
}

/* The tag badges & the remove icon */
.tags-input span {
  margin-right: 0.3em;
}

.tags-input-remove {
  cursor: pointer;
  position: absolute;
  display: inline-block;
  right: 0.3em;
  top: 0.7em;
  padding: 0.5em;
  overflow: hidden;
}

.tags-input-remove:focus {
  outline: none;
}

.tags-input-remove:before, .tags-input-remove:after {
  content: '';
  position: absolute;
  width: 75%;
  left: 0.15em;
  background: rgb(214, 93, 93);
  height: 2px;
  margin-top: -1px;
}

.tags-input-remove:before {
  transform: rotate(45deg);
}
.tags-input-remove:after {
  transform: rotate(-45deg);
}

/* Tag badge styles */
.tags-input-badge {
  position: relative;
  display: inline-block;
  padding: 0.25em 0.4em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tags-input-badge-pill {}

.tags-input-badge-pill.disabled {
  padding-right: 0.6em;
}

.tags-input-badge-selected-default {
  color: #212529;
  background-color: #f0f1f2;
}

/* Typeahead */
.typeahead-hide-btn {
  color: #999 !important;
  font-style: italic;
}

/* Typeahead - badges */
.typeahead-badges > span {
  margin-top: .5em;
  cursor: pointer;
  margin-right: 0.3em;
}

/* Typeahead - dropdown */
.typeahead-dropdown {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  z-index: 1000;
  border-radius: 5px !important;
}

.typeahead-dropdown li {
  padding: 0.8em;
  cursor: pointer;
}

/* Typeahead elements style/theme */
.tags-input-typeahead-item-default {
  color: #000000;
  background-color: #ffffff;
}

.tags-input-typeahead-item-highlighted-default {
  color: #ffffff;
  background-color: #3b82f6 !important;
}
</style>