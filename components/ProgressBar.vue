<template>
  <div class="relative flex justify-center w-16 h-4 items-center">
    <div
      :class="`h-4 ${progress === 100 ? 'rounded' : 'rounded-l'} bg-${color}`"
      :style="`width: ${progress}%`"
    ></div>
    <div
      :class="`h-full ${rest === 100 ? 'rounded' : 'rounded-r'} bg-gray-300`"
      :style="`width: ${rest}%`"
    ></div>
    <div class="absolute text-white text-xs">{{ value }} / {{ max }}</div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from '@nuxtjs/composition-api'

export default {
  name: 'ProgressBar',

  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: 'green-400',
    },
  },

  setup(props) {
    const progress = ref(0)
    const rest = ref(100)

    onMounted(() => {
      getProgressBarData()
    })

    function getProgressBarData() {
      progress.value = Math.ceil((100 / props.max) * props.value)
      rest.value = 100 - progress.value
    }

    watch(
      () => props.value,
      (newValue, oldValue) => {
        getProgressBarData()
      }
    )

    return { progress, rest }
  },
}
</script>

<style lang="scss" scoped></style>
