<template>
  <div class="w-full bg-gray-900 p-2 flex justify-around">
    <nuxt-link to="/hero">
      <img src="/icons/ui/hero-no-bg.svg" class="w-8" />
    </nuxt-link>
    <nuxt-link to="/">
      <img src="/icons/ui/stabbed-note.svg" class="w-8" />
    </nuxt-link>
    <nuxt-link to="/inventory">
      <img src="/icons/ui/backpack.svg" class="w-8" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',

  setup() {
    return {}
  },
}
</script>
