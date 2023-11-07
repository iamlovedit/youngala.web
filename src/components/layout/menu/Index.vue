<template>
    <a-menu mode="horizontal" style="height: 100%;" v-model:selected-keys=currentRoute accordion
        @menu-item-click="onMenuItemClick">
        <template v-for="item in constantRoute">
            <a-menu-item :key="item.path" v-if="!item.meta.hidden">
                {{ item.meta.title }}
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'
import { constantRoute } from '@/router/routes'
const currentRoute = ref<Array<string>>([]);
const route = useRoute();
const router = useRouter();
function onMenuItemClick(key: string) {
    router.push({
        path: key
    })
}

onMounted(() => {
    currentRoute.value = new Array<string>(route.matched[0].path);
})
</script>

<style scoped></style>