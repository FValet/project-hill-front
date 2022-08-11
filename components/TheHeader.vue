<template>
  <div class="w-full bg-gray-900 p-2 text-xs flex justify-between items-center">
    <span>Lvl. {{ hero.attributes.level }}</span>
    <!-- <span>xp {{ hero.attributes.collected_xp }}/{{ level.required_xp }} </span> -->
    <div class="flex">
      <span class="mr-1">xp:</span>
      <div class="relative flex justify-center w-48 h-4 items-center">
        <!-- <progress-bar
          :value="hero.attributes.collected_xp"
          :max="level.required_xp"
        /> -->
        <div
          :class="`h-full ${
            result.progress === 100 ? 'rounded' : 'rounded-l'
          } bg-green-400`"
          :style="`width: ${result.progress}%`"
        ></div>
        <div
          :class="`h-full ${
            result.rest === 100 ? 'rounded' : 'rounded-r'
          } bg-gray-300`"
          :style="`width: ${result.rest}%`"
        ></div>
        <div class="absolute text-black">
          {{ hero.attributes.collected_xp }} / {{ level.required_xp }}
        </div>
      </div>
    </div>
    <span class="flex gap-1 items-center"
      >{{ hero.attributes.money }}
      <img src="/icons/ui/crown-coin.svg" class="w-4" />
    </span>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from '@nuxtjs/composition-api'
import { useHeroStore } from '~/store/hero'

export default {
  name: 'TheFooter',

  setup() {
    const loaded = ref(false)
    const heroStore = useHeroStore()

    const hero = computed(() => heroStore.hero)
    const level = computed(() => heroStore.level)
    const result = ref({ progress: 0, rest: 0 })

    onMounted(() => {
      getProgressBarData()
      loaded.value = true
    })

    function getProgressBarData() {
      const progress = Math.ceil(
        (100 / level.value.required_xp) * hero.value.attributes.collected_xp
      )
      result.value.progress = progress > 100 ? 100 : progress
      result.value.rest = 100 - progress
    }

    watch(
      () => hero.value.attributes.collected_xp,
      (newValue, oldValue) => {
        getProgressBarData()
      }
    )

    return { loaded, hero, level, result }
  },
}
</script>
