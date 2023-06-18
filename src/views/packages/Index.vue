<template>
    <Content>
        <RouterView />
    </Content>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";
import Content from '@components/layout/content/Index.vue';

const router = useRouter();
const route = useRoute();
const searchInputValue = ref<string | undefined>(route.query['keyword'] as string);



function onSearchClick(keyword: string): void {
    if (searchInputValue.value) {
        router.push({
            name: 'search',
            query: {
                keyword: keyword,
            }
        })
    }
}

function onClear(): void {
    searchInputValue.value = undefined
    if (route.name === 'search') {
        router.push({
            name: 'packages',
        })
    }
}

</script>
<style scoped lang="scss">
.packageContainer {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: space-between;

    .contentContainer {
        flex: 1;
    }

    .inputBoxContainer {
        width: 320px;
        height: fit-content;
    }

    .routerViewContainer {
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        width: 100%;
    }
}
</style>