<template>
    <div>
        <router-link v-bind:to="`pokemon/${item.name}`">
            <h2>{{ item.name }}</h2>
        </router-link>
        <PokemonImg class="preview-img" v-bind:name="item.name" />
    </div>
</template>

<script>
import PokemonImg from './PokemonImg.vue';

export default {
    data() {
        return {
        }
    },

    computed: {

    },

    methods: {

    },

    props: ['item'],

    created() {

    },

    components: { PokemonImg }
}
</script>