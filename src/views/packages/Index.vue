<template>
    <div class="packagesContainer">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped>
.packagesContainer {
    flex: 1;
}
</style>