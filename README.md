### Vue 3 Voerro Tags Input
<hr>

[Documentation](https://github.com/voerro/vue-tagsinput/blob/master/README.md)

[Example usage](https://github.com/nor1c/vue-tagsinput/blob/main/test/src/App.vue)

#### Usage
```ts
import { TagsInput } from '@nor1c/vue-tagsinput'
```

#### Nuxt 3
```ts
// as plugin (plugins/tags-input.plugin.client.ts)
import { TagsInput } from '@nor1c/vue-tagsinput'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('tags-input', TagsInput)
})
```
