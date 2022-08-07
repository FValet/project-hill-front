<template>
  <div v-if="loaded" class="container grid grid-cols-12 gap-4 lg:gap-12">
    <h1
      class="flex justify-around col-span-12 gap-4 text-2xl font-bold text-center lg:gap-12"
    >
      <span class="uppercase">{{ hero.attributes.name }}</span>
      <span>level {{ hero.attributes.level }}</span>
    </h1>
    <div class="grid grid-cols-12 col-span-12 h-full gap-4">
      <div class="col-span-12 flex justify-around">
        <span class="col-span-6">xp: {{ hero.attributes.collected_xp }}</span>
        <span class="flex gap-1 items-center"
          >{{ hero.attributes.money }}
          <img src="/icons/ui/crown-coin.svg" class="w-4" />
        </span>
      </div>
      <div class="col-span-12 lg:col-span-4 grid grid-cols-12 gap-4">
        <span class="text-center underline col-span-12">Equipments:</span>

        <div class="col-span-12 mx-auto">
          <img src="/icons/ui/no-equipment.svg" class="w-12 cursor-pointer" />
        </div>
        <div class="col-span-12 mx-auto flex gap-4">
          <img src="/icons/ui/no-equipment.svg" class="w-12 cursor-pointer" />
          <img src="/icons/ui/no-equipment.svg" class="w-12 cursor-pointer" />
          <img src="/icons/ui/no-equipment.svg" class="w-12 cursor-pointer" />
        </div>
        <div class="col-span-12 mx-auto">
          <img src="/icons/ui/no-equipment.svg" class="w-12 cursor-pointer" />
        </div>
        <div class="col-span-12 mx-auto">
          <img src="/icons/ui/no-equipment.svg" class="w-12 cursor-pointer" />
        </div>
      </div>

      <div class="col-span-12 lg:col-span-4 grid grid-cols-12 gap-4">
        <span class="underline text-center col-span-12">Statistics:</span>
        <div class="col-span-12 grid grid-cols-12 gap-4 text-xs">
          <div class="col-span-4 lg:col-span-3 flex flex-col">
            <span>heal point:</span>{{ hero.attributes.statistics.heal_point }}
          </div>
          <div class="col-span-4 lg:col-span-3 flex flex-col">
            <span>defense:</span>{{ hero.attributes.statistics.defense }}
          </div>
          <div class="col-span-4 lg:col-span-3 flex flex-col">
            <span>magic_defense:</span
            >{{ hero.attributes.statistics.magic_defense }}
          </div>
          <div class="col-span-4 lg:col-span-3 flex flex-col">
            <span>strength:</span>{{ hero.attributes.statistics.strength }}
          </div>
          <div class="col-span-4 lg:col-span-3 flex flex-col">
            <span>magic:</span>{{ hero.attributes.statistics.magic }}
          </div>
          <div class="col-span-4 lg:col-span-3 flex flex-col">
            <span>critical:</span>{{ hero.attributes.statistics.critical }}
          </div>
          <div class="col-span-4 lg:col-span-3 flex flex-col">
            <span>accuracy:</span>{{ hero.attributes.statistics.accuracy }}
          </div>
          <div class="col-span-8 lg:col-span-3 flex flex-col">
            <span>dodge:</span>{{ hero.attributes.statistics.dodge }}
          </div>
          <div class="col-span-4 lg:col-span-3 flex flex-col">
            <span>haste:</span>{{ hero.attributes.statistics.haste }}
          </div>
          <div class="col-span-8 lg:col-span-3 flex flex-col">
            <span>luck:</span>{{ hero.attributes.statistics.luck }}
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-4 grid grid-cols-12 gap-4">
        <span class="underline text-center col-span-12">Resistances:</span>
        <div class="col-span-12 grid grid-cols-12 gap-4 text-xs">
          <div class="col-span-4 flex flex-col">
            <span>physical:</span>{{ hero.attributes.resistances.physical }}
          </div>
          <div class="col-span-8 flex flex-col">
            <span>magic:</span>{{ hero.attributes.resistances.magic }}
          </div>
          <div class="col-span-4 flex flex-col">
            <span>fire:</span>{{ hero.attributes.resistances.fire }}
          </div>
          <div class="col-span-4 flex flex-col">
            <span>lightning:</span>{{ hero.attributes.resistances.lightning }}
          </div>
          <div class="col-span-4 flex flex-col">
            <span>water:</span>{{ hero.attributes.resistances.water }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from '@nuxtjs/composition-api'
import { useHeroStore } from '~/store/hero'

export default {
  name: 'IndexPage',
  layout: 'DefaultLayout',

  setup() {
    const loaded = ref(false)
    const heroStore = useHeroStore()

    const hero = computed(() => heroStore.hero)

    onMounted(() => {
      loaded.value = true
    })

    return { loaded, hero }
  },
}
</script>
