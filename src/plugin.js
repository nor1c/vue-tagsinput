import TagsInput from './components/TagsInput.vue'

export default {
  install: (app, options) => {
    app.component('n-tags-input', TagsInput)
  }
}