import axios from 'axios';

const http = axios.create({
    baseURL: "https://pokeapi.co/api/v2/"
})

export default {
    getPokemonList(limit, offset) {
        return http.get(`pokemon?limit=${limit}&offset=${offset}`)
    },

    getPokemonInfo(pokemonName){
        return http.get(`/pokemon/${pokemonName}`);
    },

    getAbilityInfo(abilityName){
        return http.get(`ability/${abilityName}`)
    }
}