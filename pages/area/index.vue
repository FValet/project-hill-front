<template>
  <div class="container grid grid-cols-12 gap-4 lg:gap-12">
    <h1 class="col-span-12 text-2xl font-bold text-center uppercase">Areas</h1>
    <div class="grid grid-cols-12 col-span-12 gap-4 lg:gap-12">
      <div
        v-for="area in areas"
        :key="area.id"
        :class="`col-span-6 px-2 py-8 text-center border rounded lg:col-span-4 relative ${
          area.attributes.unlocked
            ? 'cursor-pointer hover:border-gray-800 hover:bg-white hover:text-gray-800'
            : 'cursor-not-allowed hover:bg-gray-600'
        }`"
        @click="$router.push(`/area/${area.id}`)"
      >
        <div class="absolute top-0 right-0 flex gap-2 p-1">
          <img
            :src="`/icons/ui/${
              area.attributes.unlocked ? 'padlock-open' : 'padlock-close'
            }.svg`"
            class="w-6"
          />
          <img
            :src="`/icons/ui/${
              area.attributes.completed ? 'check-mark-green' : 'check-mark-red'
            }.svg`"
            class="w-6"
          />
        </div>
        <span>{{ area.attributes.name }}</span>
      </div>
    </div>
    <div class="col-span-12 mx-auto mt-4">
      <nuxt-link
        to="/"
        class="px-4 py-2 font-bold text-black bg-gray-200 border border-black rounded"
      >
        Back
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
