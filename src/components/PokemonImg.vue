<template>
    <img v-bind:src="frontImgUrl">
    <img v-bind:src="backImgUrl">
</template>

<script>

export default {
    props: {
        frontImgUrl: String,
        backImgUrl: String,
    }
}
</script>