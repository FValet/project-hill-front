import { defineStore } from 'pinia'
import { useHeroStore } from './hero'

export const useFightStore = defineStore({
    id: 'fight',

    state: () => ({
        data: []
    }),

    actions: {
        async prepareFight(stage) {
            this.data = await this.$nuxt.$strapi.findOne('script/prepare-fight', stage.id)
        },

        async fight() {
            try {
                // if (this.data.opponents.length && this.data.hero.current_heal_point > 0) {
                    const { data, brief, reward } = await this.$nuxt.$strapi.create('script/fight', this.data)
                    if (reward.id) {
                        const heroStore = useHeroStore()
                        heroStore.hero.attributes.collected_xp += reward.xp
                        if (reward.has_level_up) {
                            heroStore.hero.attributes.level += 1
                            heroStore.hero.attributes.collected_xp -= heroStore.level.required_xp
                            await useHeroStore().getNextLevel()
                        }
                        if (reward.money) heroStore.hero.attributes.money += reward.money
                        // if (reward.item) // TODO: add items in inventory
                        // TODO: add modal
                    }
                    this.data = data

                    return { brief, result: !!reward.id }
                // } else {
                // }
            } catch (error) {
                console.log(error)
            }
        }
    }
})
