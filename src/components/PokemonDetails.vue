<template>
    <div>
        <h2 class="title">{{ pokemon.name }}</h2>
        <PokemonImg class="header-pokemon" v-bind:frontImgUrl="pokemon.sprites.front_default"
            v-bind:backImgUrl="pokemon.sprites.back_default" />

        <header>Abilities: </header>
        <section p v-for="ability in pokemon.abilities" v-bind:key="ability.slot">
            <router-link v-bind:to="`/ability/${ability.ability.name}`">
                <span>{{ ability.ability.name }}</span>
            </router-link>
        </section>
    </div>
</template>

<script>
import ps from '../services/pokeservice.js';
import PokemonImg from './PokemonImg.vue';

export default {
    data(){
        return {
            pokemonName: "",
        }
    },

    components: { PokemonImg },

    computed: {
        pokemon() {
            return this.getPokemonFromStore()[0];
        }
    },

    created() {
        this.pokemonName = this.$route.params.PokemonName;
        if(this.getPokemonFromStore().length == 0){
            this.getPokemonFromAPI();
        }
    },

    methods: {
        getPokemonFromStore(){
            return this.$store.getters.getPokemon.filter((item) => {
                return item.name == this.pokemonName;
            });
        },
        getPokemonFromAPI(){
            ps.getPokemonInfo(this.pokemonName).then((response) => {
                this.$store.commit("SET_POKEMON", response.data);
            });
        }
    }
}
</script>