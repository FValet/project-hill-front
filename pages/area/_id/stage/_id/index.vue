<template>
  <div v-if="loaded" class="container grid grid-cols-12 gap-4 lg:gap-12">
    <h1
      class="flex flex-col pb-6 col-span-12 gap-4 text-2xl font-bold text-center uppercase lg:gap-12"
    >
      <span>{{ stage.attributes.area.data.attributes.name }}</span>
      <!-- TODO: replace stage.id by index of stage in area's stages -->
      <span>Stage {{ stage.id }}</span>
    </h1>
    <div class="flex flex-col col-span-12 gap-4 p-4 border lg:gap-12">
      <div class="flex flex-col gap-2">
        <h2 class="underline">Opponents:</h2>
        <div class="flex justify-around">
          <img
            v-for="opponent in getOpponents()"
            :key="opponent.id"
            :src="`/icons/opponents/${opponent.icon}.svg`"
            class="w-12"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h2 class="underline">Reward:</h2>
        <div class="grid grid-cols-12 gap-4">
          <div class="flex flex-col col-span-6 lg:col-span-3">
            <span>money:</span><span>{{ stage.attributes.reward.money }}</span>
          </div>
          <div class="flex flex-col col-span-6 lg:col-span-3">
            <span>xp:</span><span>{{ stage.attributes.reward.xp }}</span>
          </div>
          <div class="flex flex-col col-span-12 lg:col-span-6">
            <span>obtainable items:</span><span>{{ getRewardItems() }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-12 mx-auto">
      <!-- TODO: replace stage.id by index of stage in area's stages -->
      <nuxt-link
        :to="`/fight?area=${stage.attributes.area.data.id}&stage=${stage.id}`"
        class="px-4 py-2 font-bold text-black bg-red-400 border border-black rounded hover:text-red-400 hover:border-red-400 hover:bg-gray-200"
      >
        Fight
      </nuxt-link>
    </div>
    <div class="col-span-12 mx-auto mt-4">
      <nuxt-link
        :to="`/area/${stage.attributes.area.data.id}`"
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
    const stage = ref({})

    onMounted(async () => {
      const id = route.value.params.id
      const { data } = await $strapi.findOne('stages', id, {
        populate: [
          'area',
          'opponents',
          'opponents.opponent',
          'reward',
          'reward.items',
        ],
      })
      stage.value = data

      loaded.value = true
    })

    function getOpponents() {
      const opponents = []
      stage.value.attributes.opponents.forEach((x) => {
        for (let i = 0; i < x.quantity; i++) {
          opponents.push(x.opponent.data.attributes)
        }
      })
      return opponents
    }

    function getRewardItems() {
      const rewardItems = stage.value.attributes.reward.items.data
      let items = ''
      rewardItems.forEach(
        (x, i) =>
          (items +=
            x.attributes.name +
            ` (${x.attributes.drop_rate}%)${
              rewardItems.length > 1 && i + 1 < rewardItems.length ? ', ' : ''
            }`)
      )
      return items
    }

    return { loaded, stage, getOpponents, getRewardItems }
  },
}
</script>
