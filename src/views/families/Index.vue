<template>
    <div class="libraryContainer">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped>
.libraryContainer {
    flex: 1;
}
</style>