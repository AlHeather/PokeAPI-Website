<template>
    <img v-bind:src="pokeImg.frontImg">
    <img v-bind:src="pokeImg.backImg">
</template>

<script>
import ps from '../services/pokeservice.js';

export default {
    data(){
        return{
            pokeImg: {
                name: '',
                frontImg: '',
                backImg: ''
            },

        }
    },

    computed: {

    },

    props: {
        name: String,
    },

    created(){
        this.pokeImg.name = this.name;
        let result = this.$store.getters.getPokeImg.filter((item) => {
            return item.name == this.pokeImg.name;
        })
        if(result.length == 0 || this.$store.getters.getPokeImg.length == 0){
            ps.getPokemonInfo(this.pokeImg.name).then((response) => {
                this.pokeImg.frontImg = response.data.sprites.front_default;
                this.pokeImg.backImg = response.data.sprites.back_default;
                this.$store.commit("SET_POKEIMG", this.pokeImg);
            })
        }else{
            this.pokeImg = result[0];
        }
    }

}
</script>