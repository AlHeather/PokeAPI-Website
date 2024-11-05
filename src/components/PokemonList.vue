<template>
    <div class="search-settings">
        <label for="limit">Limit: </label>
        <input class="limit-input" name="limit" type="number" v-model="limit" @change="checkLimitAgainstList">

    </div>

    <button @click="goBack">Previous</button>
    <button @click="goNext">Next</button>

    <div class="list">
        <ListItem v-show="offset <= index && index < offset + limit" v-for="(pokemon, index) in pokemonList"
            v-bind:key="index" v-bind:item="pokemon" />
    </div>
</template>

<script>
import ListItem from './PokemonListItem.vue';
import pokeservice from '@/services/pokeservice';

export default {
    components: { ListItem, },
    data() {
        return {
            limit: 20,
            offset: 0,
        }
    },
    computed: {
        pokemonList() {
            return this.$store.state.pokemonList
        },
    },
    created() {
        if (!this.$store.state.isLoaded) {
            this.updatePokemonList();
        }
    },
    methods: {
        updatePokemonList() {
            pokeservice.getPokemonList(this.limit, this.pokemonList.length).then((response) => {
                this.$store.commit("SET_POKEMON_LIST", response.data);
            })
        },
        goNext() {
            this.offset += this.limit;
            if (this.offset + this.limit > this.$store.getters.getPokemonList.length) {
                this.updatePokemonList();
            }
        },
        goBack() {
            if (this.offset < this.limit) {
                this.offset = 0;
            } else {
                this.offset -= this.limit;
            }
        },
        checkLimitAgainstList() {
            if (this.limit + this.offset > this.pokemonList.length) {
                this.updatePokemonList();
            }
        },
        
    }

};

</script>

<style></style>