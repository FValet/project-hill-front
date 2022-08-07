<template>
  <div v-if="loaded" class="container grid grid-cols-12 gap-4 lg:gap-12">
    <h1
      class="flex flex-col col-span-12 gap-4 text-2xl font-bold text-center uppercase lg:gap-12"
    >
      <span>Inventory</span>
    </h1>
    <!-- TODO: add items's quantities on icons -->
    <div class="grid grid-cols-12 col-span-12 h-full gap-4">
      <div class="col-span-12 grid grid-cols-12 gap-2">
        <div
          v-for="item of inventory"
          :key="item.id"
          class="col-span-3 lg:col-span-1 p-3 lg:p-4 flex items-center flex-col relative"
        >
          <img
            :src="`/icons/items/${item.attributes.icon}.svg`"
            class="w-full"
          />
          <span class="text-center text-xs lg:text-base">{{
            item.attributes.name
          }}</span>
          <span
            class="text-center text-sm lg:text-base absolute p-0.5 lg:p-1 left-0 top-0"
            >x{{ item.attributes.inventory_quantity }}</span
          >
        </div>
        <div
          v-for="i of 48 - inventory.length"
          :key="i"
          class="col-span-3 lg:col-span-1 p-3 lg:p-4 flex items-center flex-col relative"
        >
          <img :src="`/icons/ui/no-item.svg`" class="w-full" />
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

    const inventory = computed(() => heroStore.inventory)
    // const emptyItems = ref([])

    onMounted(() => {
      // for (let i = 0; i <= 24 - inventory.value.length; i++) emptyItems.value.push({ icon: 'no-equipment' })
      loaded.value = true
    })

    return { loaded, inventory }
  },
}
</script>
