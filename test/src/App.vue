<template>
  <div class="container mx-auto">
    <button @click="openShowTagSelector()">SHOW TAGS SELECTOR</button>

    <div class="input-block">
      <TagSelector
        ref="tagSelectRef"
        v-show="showTagSelector"
        @apply="applyTags"
        @closeTagSelector="showTagSelector = false"
      />

      APPLIED TAGS: {{ previousSelectedTags.length }}
    </div>
  </div>
</template>

<script setup>
import {
  ref, toRaw
} from 'vue'
import TagSelector from './components/TagSelector.vue'

const tagSelectRef = ref(null)
const showTagSelector = ref(false)
const previousSelectedTags = ref([])

const applyTags = (selectedTags) => {
  // tagSelectRef.value = false

  previousSelectedTags.value = selectedTags
  showTagSelector.value = false
}

const openShowTagSelector = () => {
  tagSelectRef.value.init(toRaw(previousSelectedTags.value))
  showTagSelector.value = true
}
</script>