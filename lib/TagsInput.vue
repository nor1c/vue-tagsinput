<template>
  <div class="tags-input-root" style="position: relative;">
    <div :class="{ [ wrapperClass + ' tags-input' ]: true, 'active': isActive, 'disabled': disabled }">
      <span v-for="(tag, index) in tags"
        :key="index"
        class="tags-input-badge tags-input-badge-pill tags-input-badge-selected-default"
        :class="{ 'disabled': disabled }"
      >
        <slot name="selected-tag"
          :tag="tag"
          :index="index"
          :removeTag="removeTag"
        >
          <span v-html="tag[textField]" />

          <a v-show="!disabled"
            href="#"
            class="tags-input-remove"
            @click.prevent="removeTag(index)"
          />
        </slot>
      </span>

      <input 
        type="text"
        ref="tagInputRef"
        :id="inputId"
        :name="inputId"
        :placeholder="placeholder"
        :value="input"
        @input="e => input = e.target.value"
        v-show="!hideInputField"
        @compositionstart="composing=false"
        @compositionend="composing=false"
        @keydown.enter.prevent="tagFromInput(false)"
        @keydown.delete="removeLastTag"
        @keydown.down="nextSearchResult"
        @keydown.up="prevSearchResult"
        @keydown="onKeyDown"
        @keyup="onKeyUp"
        @keyup.esc="clearSearchResults"
        @focus="onFocus"
        @click="onClick"
        @blur="onBlur"
        @value="tags"
      >

      <div style="display: none;" v-if="elementId">
        <input v-for="(tag, index) in tags"
          :key="index"
          type="hidden"
          :name="`${elementId}[]`"
          :value="hiddenInputValue(tag)"
        >
      </div>
    </div>

    <!-- Typeahead/Autocomplete -->
    <div v-show="searchResults.length">
      <p 
        v-if="typeaheadStyle === 'badges'"
        :class="`typeahead-${typeaheadStyle}`"
      >
        <span v-if="!typeaheadHideDiscard"
          class="tags-input-badge typeahead-hide-btn tags-input-typeahead-item-default"
          @click.prevent="clearSearchResults(true)"
          v-text="discardSearchText"
        />

        <span v-for="(tag, index) in searchResults"
          :key="index"
          v-html="tag[textField]"
          @mouseover="searchSelection = index"
          @mousedown.prevent="tagFromSearchOnClick(tag)"
          class="tags-input-badge"
          v-bind:class="{
            'tags-input-typeahead-item-default': index != searchSelection,
            'tags-input-typeahead-item-highlighted-default': index == searchSelection
          }"
        />
      </p>

      <ul 
        v-else-if="typeaheadStyle === 'dropdown'"
        :class="`typeahead-${typeaheadStyle}`"
      >
        <li v-if="!typeaheadHideDiscard"
          class="tags-input-typeahead-item-default typeahead-hide-btn"
          @click.prevent="clearSearchResults(true)"
          v-text="discardSearchText" 
        />

        <li v-for="(tag, index) in searchResults"
          :key="index"
          v-html="getDisplayField(tag)"
          @mouseover="searchSelection = index"
          @mousedown.prevent="tagFromSearchOnClick(tag)"
          v-bind:class="{
            'tags-input-typeahead-item-default': index != searchSelection,
            'tags-input-typeahead-item-highlighted-default': index == searchSelection
          }" 
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { 
  ref,
  onMounted, 
  watch,
  computed,
  nextTick,
  toRaw,
reactive
} from 'vue'

/**
 * @emit
 */
const emit = defineEmits([
  'initialized',
  'change', 
  'input', 
  'limit-reached',
  'tag-added',
  'tags-updated',
  'tag-removed',
  'tags-updated',
  'keyup', 
  'keydown', 
  'focus', 
  'click', 
  'blur',
  'update:modelValue'
])

/**
 * @props
 */
const props = defineProps({
  elementId: String,
  inputId: String,
  existingTags: {
    type: Array,
    default: () => []
  },
  idField: {
    type: String,
    default: 'key',
  },
  textField: {
    type: String,
    default: 'value',
  },
  displayField: {
    type: String,
    default: null,
  },
  valueFields: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  typeahead: {
    type: Boolean,
    default: false
  },
  typeaheadStyle: {
    type: String,
    default: 'badges'
  },
  typeaheadActivationThreshold: {
    type: Number,
    default: 1
  },
  typeaheadMaxResults: {
    type: Number,
    default: 0
  },
  typeaheadAlwaysShow: {
    type: Boolean,
    default: false
  },
  typeaheadShowOnFocus: {
    type: Boolean,
    default: true
  },
  typeaheadHideDiscard: {
    type: Boolean,
    default: false
  },
  typeaheadUrl: {
    type: String,
    default: ''
  },
  typeaheadCallback: {
    type: Function,
    default: null
  },
  placeholder: {
    type: String,
    default: 'Add a tag'
  },
  discardSearchText: {
    type: String,
    default: 'Discard Search Results'
  },
  limit: {
    type: Number,
    default: 0
  },
  hideInputOnLimit: {
    type: Boolean,
    default: false
  },
  onlyExistingTags: {
    type: Boolean,
    default: false
  },
  deleteOnBackspace: {
    type: Boolean,
    default: true
  },
  allowDuplicates: {
    type: Boolean,
    default: false
  },
  validate: {
    type: Function,
    default: () => true
  },
  addTagsOnComma: {
    type: Boolean,
    default: false
  },
  addTagsOnSpace: {
    type: Boolean,
    default: false
  },
  addTagsOnBlur: {
    type: Boolean,
    default: false
  },
  wrapperClass: {
    type: String,
    default: 'tags-input-wrapper-default'
  },
  sortSearchResults: {
    type: Boolean,
    default: true
  },
  caseSensitiveTags: {
    type: Boolean,
    default: false
  },
  beforeAddingTag: {
    type: Function,
    default: () => true
  },
  beforeRemovingTag: {
    type: Function,
    default: () => true
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  initialValue: {
    type: Array,
    default: () => []
  }
})

const tags = ref([])

const input = ref('')
const oldInput = ref('')
const hiddenInput = ref('')

const searchResults = ref([])
const searchSelection = ref(0)

const isActive = ref(false)
const composing = ref(false)

const typeaheadTags = ref()

// onCreated (() => {
//   // 
// })

const tagInputRef = ref(null)

onMounted (() => {
  /**
   * @onCreated
   * previously in onCreated
   */
  // watch for initial value
  if (props.initialValue.length) {
    setTimeout(() => {
      for (let i = 0; i < props.initialValue.length; i++) {
        tagFromSearch(reactive(props.initialValue[i]))
      }
    }, 100)
  }

  typeaheadTags.value = cloneArray(toRaw(props.existingTags));

  tagsFromValue();

  if (props.typeaheadAlwaysShow) {
    searchTag(false);
  }
  /**
   * @onCreated
   */

  // Emit an event
  emit('initialized');

  addEventListener('click', (e) => {
    if (e.target !== tagInputRef.value) {
      clearSearchResults();
    }
  })
})

const hideInputField = computed (() => (props.hideInputOnLimit && props.limit > 0 && tags.value.length >= props.limit) || props.disabled)

/**
 * @watchers
 */
watch (input, (newVal, oldVal) => {
  searchTag(false);

  if (newVal.length && newVal != oldVal) {
    const diff = newVal.substring(oldVal.length, newVal.length);

    if (props.addTagsOnSpace) {
      if (newVal.endsWith(' ')) {
        // The space shouldn't actually be inserted
        input.value = newVal.trim();

        // Add the inputed tag
        tagFromInput(true);
      }
    }

    if (props.addTagsOnComma) {
      newVal = newVal.trim();

      if (newVal.endsWith(',')) {
        // The comma shouldn't actually be inserted
        input.value = newVal.substring(0, newVal.length - 1);

        // Add the inputed tag
        tagFromInput(true);
      }
    }

    emit('change', newVal)
  }
})

watch (props.existingTags, newVal => {
  typeaheadTags.value.splice(0);
  typeaheadTags.value = cloneArray(newVal);
  searchTag();
})

watch (tags.value, () => {
  // Updating the hidden input
  hiddenInput.value = JSON.stringify(toRaw(tags.value));

  // Update the bound v-model value
  emit('update:modelValue', toRaw(tags.value))
})

watch (() => props.modelValue, () => {
  tagsFromValue();
})

watch (() => props.typeaheadAlwaysShow, newVal => {
  if (newVal) {
    searchTag(false);
  } else {
    clearSearchResults();
  }
})
/**
 * @watchers
 */

/**
 * @methods
 */
/**
 * Remove reserved regex characters from a string so that they don't
 * affect search results
 *
 * @param string
 * @returns String
 */
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Add a tag whether from user input or from search results (typeahead)
 *
 * @param ignoreSearchResults
 * @returns void
 */
const tagFromInput = (ignoreSearchResults = false) => {
  if (composing.value) return;

  // If we're choosing a tag from the search results
  if (searchResults.value.length && searchSelection.value >= 0 && !ignoreSearchResults) {
    tagFromSearch(searchResults.value[searchSelection.value]);

    input.value = '';
  } else {
    // If we're adding an unexisting tag
    let text = input.value.trim();

    // If the new tag is not an empty string and passes validation
    if (!props.onlyExistingTags && text.length && props.validate(text)) {
      input.value = '';

      // Determine if the inputted tag exists in the typeagedTags
      // array
      let newTag = {
        [props.idField]: '',
        [props.textField]: text
      };

      const searchQuery = escapeRegExp(
        props.caseSensitiveTags
          ? newTag[props.textField]
          : newTag[props.textField].toLowerCase()
      );

      for (let tag of typeaheadTags.value) {
        const compareable = escapeRegExp(
          props.caseSensitiveTags
            ? tag[props.textField]
            : tag[props.textField].toLowerCase()
        );

        if (searchQuery === compareable) {
          newTag = Object.assign({}, tag);

          break;
        }
      }

      addTag(newTag);
    }
  }
}

/**
 * Add a tag from search results when a user clicks on it
 *
 * @param tag
 * @returns void
 */
const tagFromSearchOnClick = (tag) => {
  tagFromSearch(tag);

  tagInputRef.value.blur();
}

/**
 * Add the selected tag from the search results.
 * Clear search results.
 * Clear user input.
 *
 * @param tag
 * @return void
 */
const tagFromSearch = (tag) => {
  clearSearchResults();
  addTag(tag);

  nextTick(() => {
    input.value = '';
    oldInput.value = '';
  })
}

/**
 * Add/Select a tag
 *
 * @param tag
 * @param force
 * @returns void | Boolean
 */
const addTag = (tag, force = false) => {
  if (props.disabled && !force) {
    return;
  }

  if (!props.beforeAddingTag(tag)) {
    return false;
  }

  // Check if the limit has been reached
  if (props.limit > 0 && tags.value.length >= props.limit) {
    emit('limit-reached');
    return false;
  }

  // Attach the tag if it hasn't been attached yet
  if (!tagSelected(tag)) {
    tags.value.push(tag)

    // Emit events
    nextTick(() => {
      emit('tag-added', tag);
      emit('tags-updated');
    })
  }
}

/**
 * Remove the last tag in the tags array.
 *
 * @returns void
 */
const removeLastTag = () => {
  if (!input.value.length && props.deleteOnBackspace && tags.value.length) {
    removeTag(tags.value.length - 1);
  }
}

/**
 * Remove the selected tag at the specified index.
 *
 * @param index
 * @returns void
 */
const removeTag = (index) => {
  if (props.disabled) {
    return;
  }

  let tag = tags.value[index];

  if (!props.beforeRemovingTag(tag)) {
    return false;
  }

  tags.value.splice(index, 1);

  // Emit events
  nextTick(() => {
    emit('tag-removed', tag);
    emit('tags-updated');

    if (props.typeaheadAlwaysShow) {
      searchTag();
    }
  });
}

/**
 * Search the currently entered text in the list of existing tags
 *
 * @returns void | Boolean
 */
const searchTag = () => {
  if (props.typeahead !== true) {
    return false;
  }

  if (oldInput.value != input.value || (!searchResults.value.length && props.typeaheadActivationThreshold == 0) || props.typeaheadAlwaysShow || props.typeaheadShowOnFocus) {
    if (!props.typeaheadUrl.length && !props.typeaheadCallback) {
      searchResults.value = [];
    }

    searchSelection.value = 0;
    let trimmedInput = input.value.trim();

    if ((trimmedInput.length && trimmedInput.length >= props.typeaheadActivationThreshold) || props.typeaheadActivationThreshold == 0 || props.typeaheadAlwaysShow) {
      // Find all the existing tags which include the search text
      const searchQuery = escapeRegExp(
        props.caseSensitiveTags ? trimmedInput : trimmedInput.toLowerCase()
      );

      // AJAX search
      if (props.typeaheadCallback) {
        props.typeaheadCallback(searchQuery)
          .then((results) => {
            typeaheadTags.value = results;
          });
      } else if (props.typeaheadUrl.length > 0) {
        typeaheadTags.value.splice(0);
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            typeaheadTags.value = JSON.parse(xhttp.responseText);

            doSearch(searchQuery);
          }
        }

        const endpoint = props.typeaheadUrl.replace(':search', searchQuery);
        xhttp.open('GET', endpoint, true);
        xhttp.send();
      } else {
        // Search the existing collection
        doSearch(searchQuery);
      }
    }

    oldInput.value = input.value;
  }
}

/**
 * Perform the actual search
 *
 * @param string searchQuery
 * @return void
 */
const doSearch = (searchQuery) => {
  searchResults.value = [];

  for (let tag of typeaheadTags.value) {
    const compareable = props.caseSensitiveTags
      ? tag[props.textField]
      : tag[props.textField].toLowerCase();
    const ids = searchResults.value.map((res) => (res[props.idField]));

    if (compareable.search(searchQuery) > -1 && ! tagSelected(tag) && ! ids.includes(tag[props.idField])) {
      searchResults.value.push(tag);
    }
  }

  // Sort the search results alphabetically
  if (props.sortSearchResults) {
    searchResults.value.sort((a, b) => {
      if (a[props.textField] < b[props.textField]) return -1;
      if (a[props.textField] > b[props.textField]) return 1;

      return 0;
    });
  }

  // Shorten Search results to desired length
  if (props.typeaheadMaxResults > 0) {
    searchResults.value = searchResults.value.slice(
      0,
      props.typeaheadMaxResults
    );
  }
}

/**
 * Hide the typeahead if there's nothing intered into the input field.
 *
 * @returns void
 */
const hideTypeahead = () => {
  if (! input.value.length) {
    nextTick(() => {
      clearSearchResults();
    });
  }
}

/**
 * Select the next search result in typeahead.
 *
 * @returns void
 */
const nextSearchResult = () => {
  if (searchSelection.value + 1 <= searchResults.value.length - 1) {
    searchSelection.value++;
  }
}

/**
 * Select the previous search result in typeahead.
 *
 * @returns void
 */
const prevSearchResult = () => {
  if (searchSelection.value > 0) {
    searchSelection.value--;
  }
}

/**
 * Clear/Empty the search results.
 *
 * @reutrns void
 */
const clearSearchResults = (returnFocus = false) => {
  searchResults.value = [];
  searchSelection.value = 0;

  if (props.typeaheadAlwaysShow) {
    nextTick(() => {
      searchTag();
    });
  }

  if (returnFocus) {
    tagInputRef.value.focus();
  }
}

/**
 * Clear the list of selected tags.
 *
 * @returns void
 */
const clearTags = () => {
  tags.value.splice(0, tags.value.length);
}

/**
 * Replace the currently selected tags with the tags from the value.
 *
 * @returns void
 */
const tagsFromValue = () => {
  if (props.modelValue && props.modelValue.length) {
    if (!Array.isArray(props.modelValue)) {
      console.error('Tags Input: the v-model value must be an array!');

      return;
    }

    let tags = props.modelValue;

    // Don't update if nothing has changed
    if (tags.value == tags) {
      return;
    }

    clearTags();

    for (let tag of tags) {
      addTag(tag, true);
    }
  } else {
    if (tags.value.length == 0) {
      return;
    }

    clearTags();
  }
}

/**
 * Check if a tag is already selected.
 *
 * @param tag
 * @returns Boolean
 */
const tagSelected = (tag) => {
  if (props.allowDuplicates) {
    return false;
  }

  if (! tag) {
    return false;
  }

  const searchQuery = escapeRegExp(
    props.caseSensitiveTags ? tag[props.textField] : tag[props.textField].toLowerCase()
  );

  for (let selectedTag of tags.value) {
    const compareable = props.caseSensitiveTags
      ? selectedTag[props.textField]
      : selectedTag[props.textField].toLowerCase();

    if (selectedTag[props.idField] === tag[props.idField] && escapeRegExp(compareable).length == searchQuery.length && compareable.search(searchQuery) > -1) {
      return true;
    }
  }

  return false;
}

/**
 * Clear the input.
 *
 * @returns void
 */
const clearInput = () => {
  input.value = '';
}

/**
 * Process all the keyup events.
 *
 * @param e
 * @returns void
 */
const onKeyUp = (e) => {
  emit('keyup', e);
}

/**
 * Process all the keydown events.
 *
 * @param e
 * @returns void
 */
const onKeyDown = (e) => {
  emit('keydown', e);
}

/**
 * Process the onfocus event.
 *
 * @param e
 * @returns void
 */
const onFocus = (e) => {
  emit('focus', e);

  isActive.value = true;
}

/**
 * Process the onClick event.
 *
 * @param e
 * @returns void
 */
const onClick = (e) => {
  emit('click', e);

  isActive.value = true;

  searchTag();
}

/**
 * Process the onblur event.
 *
 * @param e
 * @returns void
 */
const onBlur = (e) => {
  emit('blur', e)

  if (props.addTagsOnBlur) {
    // Add the inputed tag
    tagFromInput(true);
  }

  if (!props.typeaheadAlwaysShow) {
    hideTypeahead();
  } else {
    searchTag();
  }

  isActive.value = false;
}

const hiddenInputValue = (tag) => {
  // Return all fields
  if (!props.valueFields) {
    return JSON.stringify(tag);
  }

  const fields = props.valueFields.replace(/\s/, '').split(',');

  // A single field
  if (fields.length === 1) {
    return tag[fields[0]];
  } else {
    // Specified fields
    return JSON.stringify(
      Object.assign(
        {},
        ...fields.map(field => ({ [field]: tag[field] }))
      )
    );
  }

  return JSON.stringify(tag);
}

const getDisplayField = (tag) => {
  const hasDisplayField = props.displayField !== undefined
    && props.displayField !== null
    && tag[props.displayField] !== undefined
    && tag[props.displayField] !== null
    && tag[props.displayField] !== '';

  return hasDisplayField
    ? tag[props.displayField]
    : tag[props.textField];
}

const cloneArray = (arr) => {
  return arr.map(el => Object.assign({}, el));
}
/**
 * @methods
 */
</script>
