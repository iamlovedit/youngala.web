<template>
    <template v-for="route in props.routes" :key="route.path" v-if="!route.meta.hidden">
        <a-menu-item>
            {{ route.meta.title }}
        </a-menu-item>
    </template>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';

interface props {
    routes: RouteRecordRaw[]
}

const props = defineProps<props>();
</script>

<style scoped></style>