<template>
  <div
    v-if="loaded"
    class="min-h-screen text-gray-200 bg-gray-800 max-w-screen relative"
  >
    <the-header class="sticky z-10 top-0" />
    <div class="py-8 h-full">
      <Nuxt class="mx-auto" />
    </div>
    <the-footer class="sticky z-10 bottom-0" />
  </div>
</template>

<script>
import { onMounted, ref } from '@nuxtjs/composition-api'
import { useHeroStore } from '~/store/hero'

export default {
  name: 'DefaultLayout',

  setup() {
    const loaded = ref(false)
    const heroStore = useHeroStore()

    onMounted(async () => {
      await heroStore.getHero()
      loaded.value = true
    })

    return { loaded }
  },
}
</script>
