<template>
  <div v-if="loaded" class="container grid grid-cols-12 gap-4 md:gap-12">
    <h1
      class="flex flex-col col-span-12 gap-4 text-2xl font-bold text-center uppercase md:gap-12"
    >
      <span>Fight</span>
    </h1>
    <div class="flex flex-col col-span-12 gap-16 px-4 py-10 border md:gap-12">
      <div class="flex flex-col gap-2">
        <div class="flex justify-around">
          <img
            v-for="opponent in getOpponents()"
            :key="opponent.id"
            :src="`/icons/opponents/${opponent.icon}.svg`"
            class="w-12"
          />
        </div>
      </div>
      <div class="mx-auto">
        <img src="/icons/ui/hero.svg" class="w-12" />
      </div>
    </div>
    <div class="flex flex-col h-64 col-span-12 p-4 overflow-y-scroll border">
      <p
        :class="`text-xs text-${text.color}-300 md:text-base`"
        v-for="(text, i) in fightBrief"
        :key="i"
      >
        {{ text.message }}
      </p>
    </div>
    <div class="col-span-12 mx-auto">
      <button
        class="px-4 py-2 font-bold text-black bg-red-400 border border-black rounded hover:text-red-400 hover:border-red-400 hover:bg-gray-200"
      >
        Attack
      </button>
    </div>
    <div class="fixed bottom-0 col-span-12 mx-auto mb-4">
      <nuxt-link
        :to="`/area/${stage.attributes.area.data.id}/stage/${stage.id}`"
        class="px-4 py-2 font-bold text-black bg-gray-200 border border-black rounded"
      >
        flee
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

    // TODO: replace string by an object with message + color
    const fightBrief = [
      { message: 'Attack to begin the fight...', color: 'blue' },
      { message: 'Attack to begin the fight...', color: 'green' },
      { message: 'Attack to begin the fight...', color: 'red' },
      { message: 'Attack to begin the fight...', color: 'white' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
      { message: 'Attack to begin the fight...', color: 'yellow' },
    ]

    onMounted(async () => {
      console.log('route', route.value.query)
      const id = route.value.query.stage
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

    return { loaded, stage, getOpponents, getRewardItems, fightBrief }
  },
}
</script>
