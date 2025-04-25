import { createStore as _createStore } from 'vuex';


export function createStore() {
    let store = _createStore({
        state: {
            pokemonList: [],
            pokemon: [],
            ability: [],
            pokeImg: [],
            isLoaded: false,
            limit: 20,
            offset: 0,
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
            },
            SET_LIMIT(state, limit){
                state.limit = limit;
            },
            SET_OFFSET(state, offset){
                state.offset = offset;
            },
            SET_POKEIMG(state, pokeImg){
                state.pokeImg.push(pokeImg)
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
            },
            getLimit(state){
                return state.limit;
            },
            getOffset(state){
                return state.offset;
            },
            getPokeImg(state){
                return state.pokeImg;
            }
        }
    })
    return store;
}