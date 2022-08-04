### Vue 3 Voerro Tags Input
<hr>

[Documentation](https://github.com/voerro/vue-tagsinput/blob/master/README.md)

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
