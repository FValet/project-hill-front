<template>
  <div class="container grid grid-cols-12 gap-4 lg:gap-12">
    <h1 class="col-span-12 text-2xl font-bold text-center uppercase">
      Project Hill
    </h1>
    <div class="col-span-12 grid grid-cols-12 gap-5">
      <nuxt-link
        to="/area"
        class="col-span-12 flex justify-around items-center p-4 text-center border rounded lg:col-span-4 relative cursor-pointer hover:border-gray-800 hover:bg-white hover:text-gray-800"
      >
        <span class="text-xl text-center w-full">Areas</span>
        <img src="/icons/ui/slalom.svg" class="w-16" />
      </nuxt-link>
      <nuxt-link
        to="/"
        class="col-span-12 flex justify-around items-center p-4 text-center border rounded lg:col-span-4 relative cursor-pointer hover:border-gray-800 hover:bg-white hover:text-gray-800"
      >
        <span class="text-xl text-center w-full">TODO</span>
        <img src="/icons/ui/square.svg" class="w-16" />
      </nuxt-link>
      <nuxt-link
        to="/"
        class="col-span-12 flex justify-around items-center p-4 text-center border rounded lg:col-span-4 relative cursor-pointer hover:border-gray-800 hover:bg-white hover:text-gray-800"
      >
        <span class="text-xl text-center w-full">TODO</span>
        <img src="/icons/ui/square.svg" class="w-16" />
      </nuxt-link>
      <nuxt-link
        to="/"
        class="col-span-12 flex justify-around items-center p-4 text-center border rounded lg:col-span-4 relative cursor-pointer hover:border-gray-800 hover:bg-white hover:text-gray-800"
      >
        <span class="text-xl text-center w-full">TODO</span>
        <img src="/icons/ui/square.svg" class="w-16" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, useContext, computed } from '@nuxtjs/composition-api'
import { useHeroStore } from '~/store/hero'

export default {
  name: 'IndexPage',
  layout: 'DefaultLayout',

  setup() {
    const { $strapi } = useContext()
    const heroStore = useHeroStore()

    const hero = computed(() => heroStore.hero)

    const areas = ref([])

    onMounted(async () => {
      await heroStore.getHero()
      const { data } = await $strapi.find('areas')
      areas.value = data
    })

    return { areas, hero }
  },
}
</script>
