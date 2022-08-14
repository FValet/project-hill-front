<template>
  <!-- @click="close(locked ? $event : null)" -->
  <div
    v-if="visible"
    class="fixed top-0 z-50 flex items-center justify-center w-full h-full text-xl text-center"
  >
    <!-- @click="returnModalValue(false)" -->
    <div
      class="fixed top-0 z-40 flex items-center justify-center w-full h-full bg-black bg-opacity-75 cursor-pointer"
    />
    <transition name="slide-fade">
      <div
        id="modal"
        class="h-[80%] h-[80%] overflow-y-auto rounded-lg flex flex-col font-sans w-full ${width} z-50 m-8 bg-gray-800 pt-4"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <!-- Modal header -->
        <!-- <div class="flex items-center justify-end p-4">
          <button
            type="button"
            aria-label="Close modal"
            @click="returnModalValue(false)"
          >
            <img src="/icons/ui/cancel.svg" class="duration-200 ease-in w-4" />
          </button>
        </div> -->

        <!-- Modal body -->
        <div class="px-6 pb-4 sm:text-left sm:px-12">
          <slot name="body">
            <p class="py-4 text-2xl font-semibold flex flex-col">
              <span>Area X</span>
              <img
                src="/icons/ui/party-popper.svg"
                class="duration-200 ease-in mx-auto w-16 my-2"
              />
              <span>Stage x done</span>
            </p>
            <p class="flex flex-col text-left justify-start text-sm">
              <span> Xp earned: {{ reward.xp }}</span>
              <span> Money earned: {{ reward.money }}</span>
              <span v-if="reward.items.length"
                >items obtained:
                <span v-for="(item, i) in reward.items" :key="i"
                  >{{ item
                  }}{{ i + 1 !== reward.items.length ? ', ' : '' }}</span
                ></span
              >
            </p>
            <!-- <p class="py-4 text-2xl font-semibold text-center text-newt-green">
              {{ content.title }}
            </p>
            <p class="text-center" v-html="$sanitizeHtml(content.body)" />
            <p v-if="content.highlighted" class="py-5 font-bold text-center">
              {{ content.highlighted }}
            </p> -->
          </slot>
        </div>

        <!-- Modal footer -->
        <slot name="footer">
          <div class="flex items-center modal-buttons">
            <!-- Buttons -->
            <button
              class="w-full bg-gray-700 rounded-bl-md hover:bg-gray-200 p-2"
              @click="returnModalValue(true)"
            >
              Continue
            </button>
          </div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    reward: {
      type: Object,
      default: () => {},
    },
  },

  setup(props, { emit }) {
    function returnModalValue(value) {
      emit('modal-value', value)
    }
    return { returnModalValue }
  },
}
</script>
