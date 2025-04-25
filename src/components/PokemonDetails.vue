<template>
    <div>
        <h2 class="title">{{ pokemonName }}</h2>
        <PokemonImg class="header-pokemon" v-bind:name="pokemonName" />

        <header>Abilities: </header>
        <section p v-for="ability in pokemon.abilities" v-bind:key="ability.slot">
            <router-link v-bind:to="`/ability/${ability.ability.name}`">
                <span>{{ ability.ability.name }}</span>
            </router-link>
        </section>

        <br><br>

        <header>Base Stats: </header>
        <section v-for="stat in pokemon.stats" v-bind:key="stat.stat.name">
            <span>{{ stat.stat.name }}: {{ stat.base_stat }}</span>
        </section>
        <footer>Base Stat Total: {{ bst }}</footer>

        <br><br>

        <header>Types: </header>
        <section class=types v-for="type in pokemon.types" v-bind:key="type.slot">
            <img class="type-indicators" v-bind:src="`/src/assets/${type.type.name}type.png`"><span>{{ type.type.name }}</span>
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
        },
        bst(){
            let result = 0;
            this.pokemon.stats.forEach((item) => {
                result += item.base_stat;
            })
            return result;
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

<style>

.type-indicators{
    height: 25px;
}

.types{
    display: flex;
    align-items: center;
}

.types > span {
    font-size: larger;
}

</style>