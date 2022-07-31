import TagsInput from './TagsInput.vue'

export default {
  install: (app, options) => {
    app.component('vue-tagsinput-v', TagsInput)
  }
}