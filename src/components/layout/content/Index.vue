<template>
    <div class="rootContainer">
        <Header />
        <div class="contentContainer">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from "@components/layout/header/Index.vue";
import Footer from "@components/layout/footer/Index.vue";
</script>

<style scoped lang="scss">
.rootContainer {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: space-between;
}

.contentContainer {
    flex: 1;
    width: 100%;
}
</style>