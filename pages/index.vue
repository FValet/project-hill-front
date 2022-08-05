<template>
  <div class="container grid grid-cols-12 gap-4 md:gap-12">
    <h1 class="col-span-12 text-2xl font-bold text-center uppercase">Areas</h1>
    <div class="grid grid-cols-12 col-span-12 gap-4 md:gap-12">
      <div
        :class="`col-span-6 px-2 pt-8 pb-2 text-center border rounded md:col-span-4 relative ${
          area.attributes.unlocked
            ? 'cursor-pointer hover:border-gray-800 hover:bg-white hover:text-gray-800'
            : 'cursor-not-allowed hover:bg-gray-600'
        }`"
        v-for="area in areas"
        :key="area.id"
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
  </div>
</template>

<script>
import { ref, onMounted, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'IndexPage',
  layout: 'DefaultLayout',

  setup() {
    const { $strapi } = useContext()

    const areas = ref([])

    onMounted(async () => {
      const { data } = await $strapi.find('areas')
      areas.value = data
    })

    return { areas }
  },
}
</script>
