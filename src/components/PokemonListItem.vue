<template>
    <div>
        <router-link v-bind:to="`pokemon/${item.name}`">
            <h2>{{ item.name }}</h2>
        </router-link>
        <PokemonImg class="preview-img" v-bind:frontImgUrl="frontImgSource" v-bind:backImgUrl="backImgSource" />
    </div>
</template>

<script>
import ps from '@/services/pokeservice';
import PokemonImg from './PokemonImg.vue';

export default {
    data() {
        return {
            loaded: false,
        }
    },

    computed: {
        pokemon() {
            return this.getPokemonInfo()[0];
        },
        frontImgSource() {
            if (this.loaded) {
                return this.pokemon.sprites.front_default;
            } else {
                return "";
            }
        },
        backImgSource() {
            if (this.loaded) {
                return this.pokemon.sprites.back_default;
            } else {
                return ""
            }
        }

    },

    methods: {
        getPokemonInfo(){
            return this.$store.getters.getPokemon.filter((item) => {
                return item.name == this.item.name;
            });
        }
    },

    props: ['item'],

    created() {
        if (this.getPokemonInfo().length == 0) {
            ps.getPokemonInfo(this.item.name).then((response) => {
                this.$store.commit("SET_POKEMON", response.data);
                this.loaded = true;
            })
        }else{
            this.loaded=true;
        }
    },

    components: { PokemonImg }
}
</script>