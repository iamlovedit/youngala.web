<template>
    <div class="homeContainer">
        <Header />
        <div class="contentContainer">

        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from "@components/layout/header/Index.vue";
import Footer from "@components/layout/footer/Index.vue";
</script>

<style scoped lang="scss">
.homeContainer {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    .contentContainer {
        flex: 1;
        width: 100%;
    }
}
</style>