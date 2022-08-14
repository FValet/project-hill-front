<template>
  <div v-if="loaded" class="container grid grid-cols-12 gap-4 lg:gap-12">
    <h1
      class="flex flex-col col-span-12 gap-4 text-2xl font-bold text-center uppercase lg:gap-12"
    >
      <span>Fight</span>
    </h1>
    <div class="flex flex-col col-span-12 gap-16 px-4 py-6 border lg:gap-12">
      <div class="flex justify-around gap-2">
        <div
          v-for="opponent in opponents"
          :key="opponent.id"
          class="flex justify-around"
        >
          <div class="flex flex-col items-center">
            <img :src="`/icons/opponents/${opponent.icon}.svg`" class="w-12" />
            <progress-bar
              class="mt-1"
              :max="opponent.statistics.heal_point"
              :value="opponent.current_heal_point"
              :color="'red-400'"
            />
          </div>
        </div>
      </div>
      <div class="mx-auto flex flex-col items-center">
        <img src="/icons/ui/hero.svg" class="w-12" />
        <progress-bar
          class="mt-1"
          :max="hero.statistics.heal_point"
          :value="hero.current_heal_point"
          :color="'green-400'"
        />
      </div>
    </div>
    <div class="flex flex-col h-36 col-span-12 p-4 overflow-y-scroll border">
      <p
        v-for="(brief, i) in fightBrief"
        :key="i"
        :class="`text-xs text-${brief.color}-300 lg:text-base`"
      >
        {{ brief.message }}
      </p>
    </div>
    <div class="col-span-12 mx-auto gap-4 flex">
      <nuxt-link
        :to="`/area/${stage.attributes.area.data.id}/stage/${stage.id}`"
        class="px-4 py-2 font-bold text-black bg-gray-200 border border-black rounded"
      >
        flee
      </nuxt-link>
      <button
        class="px-4 py-2 font-bold text-black bg-red-400 border border-black rounded hover:text-red-400 hover:border-red-400 hover:bg-gray-200"
        @click="fight()"
      >
        Attack
      </button>
    </div>
    <the-modal
      :visible="visible"
      :reward="{ xp: 10, money: 10, items: ['potion', 'test'] }"
      @modal-value="modalResponse($event)"
    />
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  useContext,
  computed,
  useRouter,
} from '@nuxtjs/composition-api'
import { debounce } from 'debounce'
import { useFightStore } from '~/store/fight'

export default {
  name: 'IndexPage',
  layout: 'DefaultLayout',

  setup() {
    const { $strapi, route } = useContext()
    const fightStore = useFightStore()
    const router = useRouter()

    const loaded = ref(false)
    const visible = ref(false)
    const stage = ref({})

    const opponents = computed(() => fightStore.data.opponents)
    const hero = computed(() => fightStore.data.hero)

    const fightBrief = ref([
      { message: 'Attack to begin the fight...', color: 'blue' },
    ])

    onMounted(async () => {
      const id = route.value.query.stage
      const { data } = await $strapi.findOne('stages', id, {
        populate: true,
      })
      stage.value = data
      await fightStore.prepareFight(stage.value)

      loaded.value = true
    })

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

    async function fight() {
      const { brief, result } = await fightStore.fight()
      fightBrief.value = [...fightBrief.value, ...brief]
      if (result) {
        delay()
      }
    }

    const delay = debounce((brief) => {
      visible.value = true
    }, 1200)

    function modalResponse(event) {
      router.push(`/area/${route.value.query.area}`)
    }

    return {
      loaded,
      stage,
      fightBrief,
      hero,
      opponents,
      getRewardItems,
      fight,
      visible,
      confirm,
      modalResponse,
    }
  },
}
</script>
