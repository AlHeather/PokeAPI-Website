<template>
    <div class="search-settings">
        <label for="limit">Limit: </label>
        <input class="limit-input" name="limit" type="number" v-model="instanceLimit" @change="setLimit(instanceLimit)">

    </div>

    <button @click="goBack()">Previous</button>
    <button @click="goNext">Next</button>

    <div class="list" v-for="(pokemon, index) in pokemonList" v-bind:key="index">
        <ListItem v-if="offset <= index && index < offset + limit" v-bind:item="pokemon" />
    </div>
</template>

<script>
import ListItem from './PokemonListItem.vue';
import pokeservice from '@/services/pokeservice';

export default {
    components: { ListItem, },
    data() {
        return {
            instanceLimit: 20,
        }
    },
    computed: {
        pokemonList() {
            return this.$store.state.pokemonList
        },
        limit() {
            return this.$store.getters.getLimit;
        },
        offset() {
            return this.$store.getters.getOffset;
        }
    },
    created() {
        if (!this.$store.state.isLoaded) {
            this.updatePokemonList();
        }
    },
    methods: {
        updatePokemonList() {
            pokeservice.getPokemonList(this.limit, this.pokemonList.length).then((response) => {
                if (response.status == 200) {
                    this.$store.commit("SET_POKEMON_LIST", response.data);
                }
            })
        },
        goNext() {
            let offset = this.offset;
            let limit = this.limit;
            let newOffset = offset + limit;
            this.$store.commit("SET_OFFSET", newOffset);
            this.checkLimitAgainstList();
        },
        goBack() {
            let offset = this.offset;
            let limit = this.limit;
            if (offset < limit) {
                this.$store.commit("SET_OFFSET", 0);
            } else {
                this.$store.commit("SET_OFFSET", (offset - limit));
            }
        },
        checkLimitAgainstList() {
            if (this.limit + this.offset > this.pokemonList.length) {
                this.updatePokemonList();
            }
        },
        setLimit(limit) {
            this.$store.commit("SET_LIMIT", limit);
            this.checkLimitAgainstList();
        }

    }

};

</script>

<style></style>