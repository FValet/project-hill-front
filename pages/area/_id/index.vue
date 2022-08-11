<template>
  <div v-if="loaded" class="container grid grid-cols-12 gap-4 lg:gap-12">
    <h1 class="col-span-12 text-2xl font-bold text-center uppercase">
      {{ area.attributes.name }}
    </h1>
    <div class="grid grid-cols-12 col-span-12 gap-4 lg:gap-12">
      <div
        v-for="stage in getAreaStages()"
        :key="stage.id"
        :class="`col-span-6 px-2 py-8 text-center border rounded lg:col-span-4 relative ${
          stage.attributes.unlocked
            ? 'cursor-pointer hover:border-gray-800 hover:bg-white hover:text-gray-800'
            : 'cursor-not-allowed hover:bg-gray-600'
        }`"
        @click="$router.push(`/area/${area.id}/stage/${stage.id}`)"
      >
        <div class="absolute top-0 right-0 flex gap-2 p-1">
          <img
            :src="`/icons/ui/${
              stage.attributes.unlocked ? 'padlock-open' : 'padlock-close'
            }.svg`"
            class="w-6"
          />
          <img
            :src="`/icons/ui/${
              stage.attributes.completed ? 'check-mark-green' : 'check-mark-red'
            }.svg`"
            class="w-6"
          />
        </div>
        <span>Stage {{ stage.id }}</span>
      </div>
    </div>
    <div class="col-span-12 mx-auto mt-4">
      <nuxt-link
        to="/area"
        class="px-4 py-2 font-bold text-black bg-gray-200 border border-black rounded"
      >
        Back
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'IndexPage',
  layout: 'DefaultLayout',

  setup() {
    const { $strapi, route } = useContext()

    const loaded = ref(false)
    const area = ref({})

    onMounted(async () => {
      const id = route.value.params.id
      const { data } = await $strapi.findOne('areas', id, { populate: '*' })
      area.value = data
      loaded.value = true
    })

    function getAreaStages() {
      return area.value.attributes.stages.data.sort(function (a, b) {
        return a.id - b.id
      })
    }

    return { loaded, area, getAreaStages }
  },
}
</script>
