import { defineStore } from 'pinia'

export const useHeroStore = defineStore({
    id: 'hero',

    state: () => ({
        hero: {},
        inventory: {},
        level: {}
    }),

    actions: {
        async getHero() {
            try {
                if (!this.hero.id) {
                    const { data } = await this.$nuxt.$strapi.find('hero', { populate: '*' })
                    this.hero = data
                    this.inventory = data.attributes.inventory.data
                    if (!this.level.id) {
                        await this.getNextLevel()
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },

        async getNextLevel() {
            // , { 'levels.level': this.hero.attributes.level }
            const { data } = await this.$nuxt.$strapi.find('levels-table', { 'levels.level': this.hero.attributes.level, populate: '*' })
            // TODO: move level recuperation in a custom route to get level and other data
            this.level = data.attributes.levels.find(x => x.level === this.hero.attributes.level)
        }
    }
})
