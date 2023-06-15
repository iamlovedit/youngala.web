<template>
    <div class="browserContainer">
        <div class="categoriesContainer">
            <CategoryTree />
        </div>
    </div>
</template>

<script setup lang="ts">
import CategoryTree from '@components/family/CategoryTree.vue';
</script>

<style scoped lang="scss">
.browserContainer {
    width: 60%;
    margin: $Global-MainContent-Margin;
    height: 100%;
    display: flex;

    .categoriesContainer {
        width: 280px;
        border: 1px solid lightgrey;
        padding: 1em;
        height: calc(100% - 2em);
    }
}
</style>