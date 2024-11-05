import { createStore as _createStore } from 'vuex';


export function createStore() {
    let store = _createStore({
        state: {
            pokemonList: [],
            pokemon: [],
            ability: [],
            isLoaded: false,
        },
        mutations: {
            SET_POKEMON_LIST(state, list){
                list.results.forEach((item) => {
                    state.pokemonList.push(item);
                })
                state.isLoaded = true;
            },
            SET_POKEMON(state, pokemon){
                state.pokemon.push(pokemon);
            },
            ADD_ABILITY(state, ability){
                state.ability.push(ability);
            }
        },
        getters: {
            getAbilities(state){
                return state.ability;
            },
            getPokemonList(state){
                return state.pokemonList;
            },
            getPokemon(state){
                return state.pokemon;
            }
        }
    })
    return store;
}