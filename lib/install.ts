import { App } from 'vue'
import TagsInput from './TagsInput.vue'

export default {
  install: (app: App) => {
    app.component('TagsInput', TagsInput)
  }
}

export { default as TagsInput } from './TagsInput.vue'