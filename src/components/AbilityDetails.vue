<template>
    <div>
        <h2>{{ ability.name }}</h2>
        <p>{{ effectEntry.effect }}</p>
    </div>
</template>

<script>
import ps from '../services/pokeservice.js';

export default {
    data() {
        return {
            abilityName: '',
        }
    },

    computed: {
        ability() {
            return this.getAbilityFromStore()[0];
        },
        effectEntry(){
            return this.ability.effect_entries.filter((item) => {
                return item.language.name == "en";
            })[0];
        }
    },

    created() {
        this.abilityName = this.$route.params.abilityName;
        if (this.getAbilityFromStore().length == 0) {
            ps.getAbilityInfo(this.abilityName).then((response) => {
                this.$store.commit("ADD_ABILITY", response.data);
            });
        }
    },

    methods: {
        getAbilityFromStore() {
            if (this.$store.state.ability.length != 0) {
                return this.$store.getters.getAbilities.filter((item) => {
                    return item.name == this.abilityName
                })
            }else{
                return []
            }
        },
    }
}
</script>